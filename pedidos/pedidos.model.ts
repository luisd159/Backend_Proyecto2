import { Schema, model } from "mongoose";

export interface IPedidos {
    client: Schema.Types.ObjectId;
    seller: Schema.Types.ObjectId;
    products: [{ id: Schema.Types.ObjectId, quantity: number }];
    comments: String;
    qualification: Number;
    active: boolean;
}

const productSchema = new Schema<IPedidos>(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
            validate: {
                validator: async function (value: string) {
                    const user = await model("user").findOne({
                        _id: value, active:true
                    });
                    return user !== null ;
                },
                message: "Usuario no encontrado",
            },
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
            validate: {
                validator: async function (value: string) {
                    const user = await model("user").findOne({
                        _id: value, active:true
                    });
                    return user !== null ;
                },
                message: "Usuario no encontrado",
            },
        },
        products: [{
            producto: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: true,
                validate: {
                    validator: async function (value: string) {
                        const producto = await model("product").findOne({
                            _id: value , active:true
                        });
                        if (producto == null || producto.active != true) {
                            throw new Error('No se encontro el producto');
                        }
                    }
                }
            },
            cantidad: { type: Number, required: true }
        }
        ],
        comments: {
            type: String,
        },
        qualification: {
            type: Number
        },

        active: { type: Boolean, default: true },
    },
    { timestamps: true, collection: "pedidos" }
);

export default model<IPedidos>("pedido", productSchema);