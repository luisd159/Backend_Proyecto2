import { createProduct, deleteProduct, getAllProducts, getCategoriesById, getProductByID, getProductUserCatOrTxt, updateProduct } from "./productos.controller";
import { compareToken } from "../Authentication/token";
const express = require("express");
const router = express.Router();

//crear producto
router.post("/", compareToken, createProduct);

//obtener todos los productos
router.get("/", getAllProducts);

//Obtener User, Category or Text
router.get("/filtro", getProductUserCatOrTxt);

//Obtener categorias por ID
router.get("/category/:_id", getCategoriesById);

//Obtener Producto por ID
router.get("/:_id", getProductByID);

//Update Producto
router.patch("/update/:_id", compareToken, updateProduct);

//inhabilitar producto
router.patch("/delete/:_id", compareToken, deleteProduct);

export default router;