import { Request, Response } from "express";
import { createUser, getUserByID } from "./usuario.controller";
const bcrypt = require('bcrypt');

jest.mock("./usuario.model", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        save: jest.fn(),
        findById: jest.fn(),
    })),
}));

describe("createUser", () => {
    it("debería crear un nuevo usuario correctamente", async () => {
        const req = {
            body: {
                name: "John Doe",
                password: "password123",
                email: "john@example.com",
                phone_number: "1234567890",
                address: "123 Street, City",
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        console.log(res.json)
        expect(res.json).toHaveBeenCalledWith({
            message: "Usuario creado exitosamente",
            user: expect.any(Object),
        });
    });

    it("debería retornar un error al intentar crear un usuario", async () => {

        const req = {
            body: {
                password: "password123",
                phone_number: "1234567890",
                address: "123 Street, City"
            },
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        jest.spyOn(bcrypt, "hash").mockRejectedValue(new Error("Error al hashear la contraseña"));
        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Error al crear el usuario",
            error: expect.any(Error),
        });
    });

});
