import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1518448301015-44e4135492a0?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Smart Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Minimal Desk Lamp",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=80"
  }
];

const seed = async () => {
  await connectDB();

  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seed();
