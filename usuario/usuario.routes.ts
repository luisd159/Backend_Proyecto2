import { compareToken } from "../Authentication/token";
import { createUser, deleteUser, getAllUser, getUserByEmailAndPass, getUserByID, updateUser } from "./usuario.controller";
const express = require("express");
const router = express.Router();

//creacion de usuario
router.post("/", createUser);

//obtener todos los usuarios
router.get("/", getAllUser);

//obtener usuario por email and password
router.get("/aut", getUserByEmailAndPass)

//obtener usuario por ID probehida
router.get("/:_id", getUserByID);

//update usuario 
router.patch("/update/:_id",compareToken, updateUser);

//update usuario 
router.patch("/delete/:_id",compareToken, deleteUser);


export default router;