/*
  Warnings:

  - You are about to alter the column `id` on the `Product` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `User` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Product" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Product" ("createdAt","description","id","name","price","updatedAt") SELECT "createdAt","description","id","name","price","updatedAt" FROM "Product";
DROP TABLE "Product" CASCADE;
ALTER TABLE "_prisma_new_Product" RENAME TO "Product";
CREATE TABLE "_prisma_new_User" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "name" STRING,
    "image" STRING,
    "phoneNumber" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
DROP INDEX "User_email_key";
INSERT INTO "_prisma_new_User" ("createdAt","email","id","image","name","phoneNumber","updatedAt") SELECT "createdAt","email","id","image","name","phoneNumber","updatedAt" FROM "User";
DROP TABLE "User" CASCADE;
ALTER TABLE "_prisma_new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
