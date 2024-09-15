import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = (
  name: string,
  description: string | null,
  price: number
) => {
  return prisma.product.create({
    data: { name, description, price },
  });
};

export const getProducts = () => {
  return prisma.product.findMany();
};

export const getProduct = (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = (
  id: string,
  name: string,
  description: string | null,
  price: number
) => {
  return prisma.product.update({
    where: { id },
    data: { name, description, price },
  });
};

export const deleteProduct = (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
