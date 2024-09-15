import { Request, Response } from "express";
import * as productService from "@/services/productService";

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const product = await productService.createProduct(name, description, price);
  res.json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getProduct(id);
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const product = await productService.updateProduct(
    id,
    name,
    description,
    price
  );
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await productService.deleteProduct(id);
  res.json({ message: "Product deleted" });
};
