import { Schema, model } from "mongoose";

interface IUser {
    name: string;
    password: string;
    email: string;
    phone_number: string;
    address: string;
    active: boolean;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/ , "Por favor, agrega un email válido"],
        },
        phone_number: {
            type: String,
            unique: true,
            required: true,
            maxlength: 10,
            minlength: 10,
        },
        address: {
            type: String,
            required: true,
            maxlength: 48,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true, collection: "users" }
);

export default model<IUser>("user", userSchema);