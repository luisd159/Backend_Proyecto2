import { Request, Response } from "express";
import Pedido, { IPedidos } from "./pedidos.model";


//crear Pedido
export const createPedido = async (req: Request, res: Response) => {
    try {
        const { client, seller, products, comments, qualification } = req.body;
        const product = new Pedido({
            client,
            seller,
            products,
            comments,
            qualification
        });
        await product.save();
        res.status(201).json({ message: "Pedido creado exitosamente", product });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el pedido", error });
    }
};

//obtener todos los pedidos
export async function getAllPedidos(req: Request, res: Response) {
    try {
        const pedidos = await Pedido.find({ active: true });

        if (pedidos.length === 0) {
            res.status(500).json({ "message": "Pedidos No Encontrados" })
        } else {
            res.status(200).json(pedidos.sort((a, b) => Number(b.qualification) - Number(a.qualification)));
        }
    } catch (error) {
        res.status(500).json({ "message": error });
    }
}

//Obtener pedido por Id proveida
export async function getPedidoByID(req: Request, res: Response) {
    try {
        const { _id } = req.params;
        const pedido = await Pedido.findOne({ _id: _id, active: true });
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(500).json({ "message": "no se encontro el pedido con la ID proveida" })
        }
    } catch (error) {
        res.status(500).json({ "message": error });
    }
}

// Fecha o Usuario
export async function getPedidoUserOrDate(req: Request, res: Response) {
    try {
        const { userId, startDate, endDate } = req.query;
        const filtro: any = {};
        filtro.active = true;
        if (startDate && endDate) {
            filtro.createdAt = {
                $gte: startDate,
                $lte: endDate,
            }
        }
        if (userId) {
            filtro.seller = userId;
        }
        const pedidos = await Pedido.find(filtro);
        if (pedidos) {
            res.status(200).json(pedidos);
        } else {
            res.status(500).json({ "message": "No se encontro ningun pedido con los filtros añadidos" })
        }

    } catch (error) {
        res.status(500).json({ "message": error });
    }
}

//update pedido calificacion comentarios 
export async function updatePedido(req: Request, res: Response) {
    try {
        const { _id } = req.params;
        const { comments, qualification } = req.body;
        const updatedPedido = await Pedido.findOneAndUpdate(
            { _id: _id, active: true },
            { comments: comments, qualification: qualification },
            {
                new: true,
            }
        );
        res.status(200).json(updatedPedido);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Error al actualizar el pedido." });
    }
}