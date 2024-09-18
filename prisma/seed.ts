import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const products = [
  {
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    sku: "RCH45Q1A",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
  },
  {
    title: "Eyeshadow Palette with Mirror",
    price: 19.99,
    sku: "MVCFH27F",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
  },
  {
    title: "Powder Canister",
    price: 14.99,
    sku: "9EN8WLT2",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
  },
  {
    title: "Red Lipstick",
    price: 12.99,
    sku: "O5IF1NTA",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
  },
  {
    id: 5,
    title: "Red Nail Polish",
    price: 8.99,
    sku: "YUIIIP4W",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png",
  },
  {
    title: "Calvin Klein CK One",
    price: 49.99,
    sku: "DZM2JQZE",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png",
  },
  {
    title: "Chanel Coco Noir Eau De",
    price: 129.99,
    sku: "K71HBCGS",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png",
  },
  {
    title: "Dior J'adore",
    price: 89.99,
    sku: "E70NB03B",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png",
  },
  {
    title: "Dolce Shine Eau de",
    price: 69.99,
    sku: "1NBFK980",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png",
  },
  {
    title: "Gucci Bloom Eau de",
    price: 79.99,
    sku: "FFKZ6HOF",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png",
  },
  {
    title: "Annibale Colombo Bed",
    price: 1899.99,
    sku: "4KMDTZWF",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
  },
  {
    title: "Annibale Colombo Sofa",
    price: 2499.99,
    sku: "LUU95CQP",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png",
  },
  {
    title: "Bedside Table African Cherry",
    price: 299.99,
    sku: "OWPLTZYX",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png",
  },
  {
    title: "Knoll Saarinen Executive Conference Chair",
    price: 499.99,
    sku: "RKHVJ4FE",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png",
  },
  {
    title: "Wooden Bathroom Sink With Mirror",
    price: 799.99,
    sku: "7OLTIEVO",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png",
  },
  {
    title: "Apple",
    price: 1.99,
    sku: "QTROUV79",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png",
  },
  {
    title: "Beef Steak",
    price: 12.99,
    sku: "BWWA2MSO",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/thumbnail.png",
  },
  {
    title: "Cat Food",
    price: 8.99,
    sku: "C3F8QN6O",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png",
  },
  {
    title: "Chicken Meat",
    price: 9.99,
    sku: "G5YEHW7B",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png",
  },
  {
    title: "Cooking Oil",
    price: 4.99,
    sku: "Q6ZP1UY8",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/thumbnail.png",
  },
];

async function main() {
  // Create user
  const user = await prisma.user.create({
    data: {
      zaloId: "1234567890",
      name: "Test User",
    },
  });
  console.log({ user });

  // Create product array
  const productArray = await prisma.product.createMany({
    data: products.map((product) => ({
      ...product,
      id: undefined, // Remove id field if present
    })),
  });
  console.log({ productArray });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
