import { Request, Response } from "express";
import Product from "./productos.model";
import { getToken } from "../Authentication/token";

//crear usuario
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, category, price, calification, user } = req.body;
        const product = new Product({
            name,
            description,
            category,
            price,
            calification,
            user
        });
        await product.save();
        res.status(201).json({ message: "Producto creado exitosamente", product });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error });
    }
};

//obter todos los productos y ordenar por calificacion
export async function getAllProducts(req: Request, res: Response) {
    try {
        const product = await Product.find();

        if (product.length === 0) {
            res.status(500).json({ "message": "Productos No Encontrados" })
        } else {
            res.status(200).json(product.sort((a, b) => Number(b.calification) - Number(a.calification)));
        }
    } catch (error) {
        res.status(500).json({ "message": error });
    }
}

export async function getProductByID(req: Request, res: Response) {
    try {
        const { _id } = req.params;
        const producto = await Product.findOne({ _id: _id, active: true });
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(500).json({ "message": "no se encontro el producto con la ID proveida" })
        }
    } catch (error) {
        res.status(500).json({ "message": error });
    }
}
