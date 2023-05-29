import { Request, Response } from "express";
import User from "./usuario.model";
import { getToken } from "../Authentication/token";
const bcrypt = require('bcrypt');

//crear usuario
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, password, email, phone_number, address } = req.body;
        const user = new User({
            name,
            password: await bcrypt.hash(password, 10),
            email,
            phone_number,
            address,
        });
        await user.save();
        res.status(201).json({ message: "Usuario creado exitosamente", user });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
};

//obtener todos los usuarios
export async function getAllUser(req: Request, res: Response) {
    try {
        const users = await User.find({active:true});
        if (users.length != 0) {
            res.status(200).json(users);
        } else {
            res.status(200).json({ "Mensaje": "No hay ningun Usuario creado" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el usuario" });
    }

}

//obtener usuario por ID
export async function getUserByID(req: Request, res: Response) {
    try {
        const { _id } = req.params;
        const user = await User.findOne({ _id: _id, active: true });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(200).json({ "error": "No se encontro un Usuario con esta ID" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el usuario" });
    }

};

//Obtener usuario por password y contraseña
export async function getUserByEmailAndPass(req: Request, res: Response) {
    try {
        const { email, password } = req.query;
        const user = await User.findOne({ email: email, active: true });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(500).json({ "message": "Contraseña incorrecta" });
            } else {
                const token = await getToken(user._id.toHexString());
                res.status(200).json({ "token": token });
            }
        } else {
            res.status(500).json({ "error": "Usuario proveido por email no encontrado o No Activo" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
}

//Actualizar usuarios
export async function updateUser(req: Request, res: Response) {
    try {
        const userUpdated = await User.findByIdAndUpdate(
            req.params._id,
            {
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 10),
                email: req.body.email,
                phone_number: req.body.phone_number,
                address: req.body.address,
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            userUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error actualizando usuario" });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const userUpdated = await User.findByIdAndUpdate(
            req.params._id,
            {
                active:false
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            userUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error inhabilitando usuario usuario" });
    }
}