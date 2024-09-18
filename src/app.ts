import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import { dirname } from "path";
const path = require("path");
const https = require("https");
const fs = require("fs");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

const sslOptions = {
  ca: fs.readFileSync(path.join(__dirname, "chain.pem")),
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// const httpServer = https.createServer(app);
// app.listen(443, () => {
//   console.log("HTTP Server running on port 443");
// });

// Create HTTPS server
https.createServer(sslOptions, app).listen(3001, () => {
  console.log("HTTPS Server running on https://localhost:3001");
});
