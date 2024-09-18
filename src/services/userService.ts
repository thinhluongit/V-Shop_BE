import { PrismaClient } from "@prisma/client";
import axios from "axios";
import express, { Request, Response } from "express";
import CryptoJS from "crypto-js";
import { log } from "console";

const prisma = new PrismaClient();
const ZALO_APP_SECRET_KEY = process.env.SECRET_KEY;

export const createUser = (
  zaloId: string,
  name: string,
  image: string,
  phoneNumber: string
) => {
  return prisma.user.create({
    data: { zaloId, name, image, phoneNumber },
  });
};

export const getUsers = () => {
  return prisma.user.findMany();
};

export const getUser = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const updateUser = (id: string, name: string | null) => {
  return prisma.user.update({
    where: { id },
    data: { name },
  });
};

export const deleteUser = (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};

// https://developers.zalo.me/docs/social-api/tai-lieu/thong-tin-ten-anh-dai-dien
export const getUserInfo = async (accessToken: string) => {
  const zaloInfoURL = "https://graph.zalo.me/v2.0/me?fields=id,name,picture";

  const calculateHMacSHA256 = (
    access_token: string,
    secretKey: string
  ): string => {
    const hmac = CryptoJS.HmacSHA256(access_token, secretKey);
    return hmac.toString(CryptoJS.enc.Hex);
  };

  try {
    const response = await axios.get(zaloInfoURL, {
      headers: {
        access_token: accessToken,
        appsecret_proof: calculateHMacSHA256(
          accessToken,
          ZALO_APP_SECRET_KEY as string
        ),
      },
    });

    const data = response.data;
    // console.log("Data = " + JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const checkUserExist = async (zaloId: string) => {
  const user = await prisma.user.findUnique({
    where: { zaloId },
  });

  return user;
};

//https://mini.zalo.me/docs/api/getPhoneNumber/
export const getPhoneNumber = async (
  accessToken: string,
  token: string,
  res: Response
) => {
  const zaloPhoneNumberUrl = "https://graph.zalo.me/v2.0/me/info";
  try {
    const response = await axios.get(zaloPhoneNumberUrl, {
      headers: {
        access_token: accessToken,
        code: token,
        secret_key: ZALO_APP_SECRET_KEY,
      },
    });

    const userInfo = await getUserInfo(accessToken);
    const { number } = response.data.data;
    console.log(number);

    if (response.status === 200 && userInfo && number) {
      const { id, name } = userInfo;
      const { url } = userInfo.picture.data;
      console.log(id);
      console.log(name);
      console.log(url);

      const user = await prisma.user.create({
        data: {
          zaloId: id, // Unique Zalo ID
          name: name, // Tên người dùng
          image: url, // URL của ảnh đại diện (image)
          phoneNumber: number, // Số điện thoại người dùng
        },
      });
      // console.log("User saved in DB:", user);
    } else {
      // Handle error or unexpected response
      console.error("Unexpected response:", response.data);
      return res
        .status(500)
        .json({ message: "Failed to retrieve user info from Zalo" });
    }
  } catch (error) {
    console.log(error);
  }
};
