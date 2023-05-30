import { Request, Response } from "express";
import { createProduct } from "./productos.controller";
import { getAllProducts } from "./productos.controller";
import Product from "./productos.model";


//Test unitarios del metodo del endpoint createProduct
describe("createProduct", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        name: "Producto de prueba",
        description: "Descripción de prueba",
        category: "Categoría de prueba",
        price: 10.99,
        qualification: 4.5,
        user: "usuarioPrueba",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería crear un producto exitosamente", async () => {
    jest.spyOn(Product.prototype, "save").mockResolvedValueOnce(undefined);

    await createProduct(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Producto creado exitosamente",
      product: expect.any(Object),
    });
  });

  it("debería manejar un error al crear un producto", async () => {
    const error = new Error("Error de prueba");
    jest.spyOn(Product.prototype, "save").mockRejectedValueOnce(error);

    await createProduct(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al crear el producto",
      error,
    });
  });
});

//Test unitarios del metodo del endpoint getAllProducts

describe("getAllProducts", () => {
  it("debería obtener todos los productos exitosamente", async () => {
    const mockProducts = [
      { name: "Producto 1", qualification: 4 },
      { name: "Producto 2", qualification: 3 },
      { name: "Producto 3", qualification: 5 },
    ];

    jest.spyOn(Product, "find").mockResolvedValueOnce(mockProducts as any);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      mockProducts.sort((a, b) => Number(b.qualification) - Number(a.qualification))
    );
  });


  it("debería retornar los productos correctamente", async () => {
    const products = [
      { name: "Product 1", qualification: 4 },
      { name: "Product 2", qualification: 5 },
      { name: "Product 3", qualification: 3 },
    ];
  
    jest.spyOn(Product, "find").mockResolvedValueOnce(products);
  
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    await getAllProducts(req, res);
  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      products.sort((a, b) => Number(b.qualification) - Number(a.qualification))
    );
  });
});


