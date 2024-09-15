import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
