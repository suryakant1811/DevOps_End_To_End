import express from "express";
import { createProducts, deleteProducts, getProducts, updateProducts } from "../controller/product.controller.js";

const router = express.Router();

router.post("/", createProducts);
router.get("/", getProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);

export default router;

//product.route.js