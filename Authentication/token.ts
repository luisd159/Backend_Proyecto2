const jsonwebtoken = require("jsonwebtoken");
require('dotenv').config();
import { Request, Response } from "express";

const secret = process.env.JWT_SECRET;

export async function getToken(_id : string) {
    const token = jsonwebtoken.sign({_id , exp: Date.now() + 60*30*1000 },secret);
    return token;
}

export async function compareToken( req: Request, res: Response, next: Function) {
    const token = req.headers.authorization?.split(" ")[1];
    const payload = jsonwebtoken.verify(token , secret );
    if(token == null){
        return res.status(500).json({ message: "El token es nullo" });
    }
    if(Date.now() > payload.exp){
        return res.status(500).json({ message: "El token ya expiró" });
    }else{
        next();
    }
}