import { createProduct, getAllProducts, getProductByID } from "./productos.controller";
import { compareToken } from "../Authentication/token";
const express = require("express");
const router = express.Router();

//crear producto
router.post("/", compareToken, createProduct);

//obtener todos los productos
router.get("/", getAllProducts);

//Obtener Producto por ID
router.get("/:_id", getProductByID);

export default router;