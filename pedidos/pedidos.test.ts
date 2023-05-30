import { Request, Response } from "express";
import { createPedido , getAllPedidos } from "./pedidos.controller"; // Importa la función del controlador
import Pedido from "./pedidos.model"; // Importa el modelo de pedidos

// test del metodo createpedido 

describe("createPedido", () => {
    it("debería crear un nuevo pedido correctamente", async () => {
      const req = {
        body: {
          client: "John Doe",
          seller: "Jane Smith",
          products: ["Product 1", "Product 2"],
          comments: "Some comments",
          qualification: 5,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
  
      await createPedido(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500); 
      expect(res.json).toHaveBeenCalledWith({
        message: "Error al crear el pedido", 
        error: expect.anything(),
      });
    });

    it("debería retornar un error al intentar crear un pedido", async () => {
        const req = {
          body: {
            client: "John Doe",
            seller: "Jane Smith",
            products: ["Product 1", "Product 2"],
            comments: "Some comments",
            qualification: 5,
          },
        } as Request;
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as unknown as Response;
    
        jest.spyOn(Pedido.prototype, "save").mockImplementationOnce(() => {
          throw new Error("Error al crear el pedido");
        });
    
        await createPedido(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: "Error al crear el pedido",
          error: expect.any(Error),
        });
      });

  });

// test getalllpedidos controlador exitosa

  describe("getAllPedidos", () => {
    it("debería retornar todos los pedidos correctamente", async () => {
      const pedidosMock = [
        { id: 1, qualification: 4 },
        { id: 2, qualification: 5 },
        { id: 3, qualification: 3 },
      ];
  
      jest.spyOn(Pedido, "find").mockResolvedValueOnce(pedidosMock);
  
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
  
      await getAllPedidos(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        pedidosMock.sort((a, b) => b.qualification - a.qualification)
      );
    });
  });


  
