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
    console.log("Access Token is:" + accessToken);

    const data = response.data;
    console.log("Data = " + JSON.stringify(data));

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

    const data = response.data;
    console.log(data);

    //   if (response.status === 200 && data) {
    //     const { id, name, birthday, phone } = data;

    //     // Assuming phone number is included in the response
    //     console.log("User Info:", { id, name, birthday, phone });

    //     if (phone) {
    //       // Save or update user phone number using Prisma
    //       const user = await prisma.user.upsert({
    //         where: { zaloId: id }, // Find user by their Zalo ID
    //         update: { name, birthday, phone }, // Update user's info
    //         create: {
    //           zaloId: id, // Create new user with their Zalo ID
    //           name,
    //           birthday,
    //           phone,
    //         },
    //       });

    //       console.log("User saved/updated in DB:", user);

    //       // Respond with success
    //       return res.status(200).json({ message: "User phone number saved", user });
    //     } else {
    //       // If phone number is not in the response, handle it appropriately
    //       return res.status(404).json({ message: "Phone number not found" });
    //     }
    //   } else {
    //     // Handle error or unexpected response
    //     console.error("Unexpected response:", response.data);
    //     return res.status(500).json({ message: "Failed to retrieve user info from Zalo" });
    //   }
    // }
  } catch (error) {
    console.log(error);
  }

  // const options = {
  //   url: zaloPhoneNumberUrl,
  //   headers: {
  //     access_token: accessToken,
  //     code: token,
  //     secret_key: ZALO_APP_SECRET_KEY,
  //   },
  // };
};
