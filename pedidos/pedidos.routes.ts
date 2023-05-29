import { compareToken } from "../Authentication/token";
import { createPedido, getAllPedidos, getPedidoByID, getPedidoUserOrDate, updatePedido } from "./pedidos.controller";
const express = require("express");
const router = express.Router();


//crear un nuevo pedido
router.post("/", compareToken, createPedido);

//obtener todos los pedidos
router.get("/all", getAllPedidos);

//obtener Pedido por fecha o usuario
router.get("/filtro", compareToken, getPedidoUserOrDate);

//Obtener Pedido por ID
router.get("/:_id", compareToken, getPedidoByID);

//Actualizar pedido 
router.patch("/update/:_id", compareToken, updatePedido);

export default router;