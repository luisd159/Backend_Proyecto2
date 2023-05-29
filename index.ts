import { connect } from "./Dbconfiguration/db";
import express from "express";
const cors = require("cors");
import userRoutes from "./usuario/usuario.routes";
import productRoutes from "./productos/producto.routes";
import pedidosRoutes from "./pedidos/pedidos.routes";

//instanciamos la app usando express
const app = express();

app.listen(process.env.PORT, ()=>{
    connect();
    console.log("App listened in port " + process.env.PORT);
});

// Middlewares
app.use(cors());
app.use(express.json());

//rutas
app.use("/users", userRoutes);
app.use("/products", productRoutes )
app.use("/pedidos",pedidosRoutes)

// Endpoint para 404
app.use((req: express.Request, res: express.Response) => {
    res.status(404).json({ message: "Not found." });
});