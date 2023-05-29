import { Request, Response } from "express";
import Product, { IProductos } from "./productos.model";
import { getToken } from "../Authentication/token";

//crear Producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, category, price, qualification, user } = req.body;
        const product = new Product({
            name,
            description,
            category,
            price,
            qualification,
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
        const product = await Product.find({active:true});

        if (product.length === 0) {
            res.status(500).json({ "message": "Productos No Encontrados" })
        } else {
            res.status(200).json(product.sort((a, b) => Number(b.qualification) - Number(a.qualification)));
        }
    } catch (error) {
        res.status(500).json({ "message": error });
    }
}

//Obtener Producto por ID
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

// Usuario , Categoria o Texto
export async function getProductUserCatOrTxt(req: Request, res: Response) {
    try {
        const { id, category, text } = req.query;
        const filtro: any = {};
        filtro.active = true;
        if (id) {
            filtro.user = id;
        }
        if (category) {
            filtro.category = category;
        }
        if (text) {
            filtro.description = text;
        }
        const productos = await Product.find(filtro);
        if (productos) {
            res.status(200).json(productos);
        } else {
            res.status(500).json({ "message": "No se encontro ningun producto con los filtros añadidos" })
        }

    } catch (error) {
        res.status(500).json({ "message": error });
    }
}

// categorias de productos de un Usuario

export async function getCategoriesById(req: Request, res: Response) {
    try {
        const distinto = (value:any , index:any, array:any) => {
            return array.indexOf(value) == index;
        }

        const { _id } = req.params;
        const productos = await Product.find({ user: _id, active: true });
        const categorias = productos.map((producto: IProductos) => producto.category);
        const resultado = categorias.filter(distinto);
        if (productos) {
            res.status(200).json(resultado);
        } else {
            res.status(500).json({ "message": "no se encontro ninguna categoria con la ID proveida" })
        }
    } catch (error) {
        res.status(500).json({ "message": error });
    }
}

//Actualizar Producto
export async function updateProduct(req: Request, res: Response) {
    try {   
        const productUpdated = await Product.findByIdAndUpdate(
            req.params._id,
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                qualification: req.body.qualification,
                user: req.body.user
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            productUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error actualizando usuario" });
    }
}

//inhabilitando producto
export async function deleteProduct(req: Request, res: Response) {
    try {
        const productUpdated = await Product.findByIdAndUpdate(
            req.params._id,
            {
                active:false
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            productUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error inhabilitando usuario usuario" });
    }
}