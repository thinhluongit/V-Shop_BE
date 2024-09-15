import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = (
  email: string,
  name: string,
  phoneNumber: string,
  image: string
) => {
  return prisma.user.create({
    data: { email, name, phoneNumber, image },
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

export const updateUser = (id: string, email: string, name: string | null) => {
  return prisma.user.update({
    where: { id },
    data: { email, name },
  });
};

export const deleteUser = (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
