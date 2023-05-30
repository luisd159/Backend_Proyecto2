import { Request, Response } from "express";
import { createUser, getUserByID } from "./usuario.controller";
// const bcrypt = require('bcrypt');
import User from './usuario.model'

jest.mock("./usuario.model", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        save: jest.fn(),
        findOne: jest.fn(),
    })),
}));

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("createUser", () => {
    test("debería crear un nuevo usuario correctamente", async () => {
        const req = {
            body: {
                name: "John Doe",
                password: "password123",
                email: "john@example.com",
                phone_number: "1234567890",
                address: "123 Street, City",
            },
        }as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        // bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Usuario creado exitosamente",
            user: expect.any(Object),
        });
    });

    test("debería retornar un error al intentar crear un usuario", async () => {

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

        // jest.spyOn(bcrypt, "hash").mockRejectedValue(new Error("Error al hashear la contraseña"));

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Error al crear el usuario",
            error: expect.any(Error),
        });
    });

});


describe("getUserByID", () => {

    test("Deberia Retornar el usuario encontrado", async () => {
        const userId = "6473de83fa5e9aad82e70140";
        const user = {
            "_id": userId,
            "name": "luis",
            "password": "luis1",
            "email": "luis@gmail.com",
            "phone_number": "3188740119",
            "address": "miramar",
            "active": true
        }

        const req = {
            params: {
              _id: userId,
            },
          }as unknown as Request;

          const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
          } as unknown as Response;
      
          jest.spyOn(User, "findOne").mockResolvedValue(user);
          await getUserByID(req, res);
      
        //   expect(User.findOne).toHaveBeenCalledWith({ _id: userId, active: true });
          expect(res.status).toHaveBeenCalledWith(200);
        //   expect(res.json).toHaveBeenCalledWith(user);
    });
});



// describe("getUserByEmailAndPass", () => {
//     afterEach(() => {
//       jest.clearAllMocks();
//     });
  
//     it("debería retornar el token si el usuario y la contraseña son válidos", async () => {
//       const email = "john@example.com";
//       const password = "password123";
//       const user = { _id: "123", email, password: "hashedPassword", active: true };
//       const token = "token123";
  
//       const req = {
//         query: { email, password },
//       } as unknown as Request;
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       } as unknown as Response;
  
//       jest.spyOn(User, "findOne").mockResolvedValue(user);
//       jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
//       jest.spyOn(getToken, "getToken").mockResolvedValue(token);
  
//       await getUserByEmailAndPass(req, res);
  
//       expect(User.findOne).toHaveBeenCalledWith({ email, active: true });
//       expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
//       expect(getToken.getToken).toHaveBeenCalledWith(user._id.toHexString());
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({ token });
//     });
// });