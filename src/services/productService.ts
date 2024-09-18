import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = (
  title: string,
  price: number,
  sku: string,
  thumbnail: string
) => {
  return prisma.product.create({
    data: { title, price, sku, thumbnail },
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
  title: string,
  price: number,
  sku: string,
  thumbnail: string
) => {
  return prisma.product.update({
    where: { id },
    data: { title, price, sku, thumbnail },
  });
};

export const deleteProduct = (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
