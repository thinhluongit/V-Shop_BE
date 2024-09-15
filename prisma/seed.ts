import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
    },
  });
  console.log({ user });

  // Create product
  const product = await prisma.product.create({
    data: {
      name: "Test Product",
      description: "This is a test product",
      price: 9.99,
    },
  });
  console.log({ product });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
