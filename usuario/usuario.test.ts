import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser } from "./usuario.controller";

jest.mock("./usuario.model", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
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
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario creado exitosamente",
      user: expect.any(Object),
    });
  });

  it("debería retornar un error al intentar crear un usuario", async () => {
    const req = {
      body: {
        name: "John Doe",
        password: "password123",
        email: "john@exam",
        phone_number: "1234567890",
        address: "123 Street, City",
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    await createUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al crear el usuario",
      error: expect.any(Error),
    });
  });

});