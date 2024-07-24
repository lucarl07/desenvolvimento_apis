// Dependências:
import "dotenv/config";
import express from "express";

// Modelos de entidade:
import "./models/lineModel.js"
import "./models/driverModel.js"
import "./models/busModel.js"

// Módulos de rotas:
import lineRouter from "./routes/lineRouter.js";
import driverRouter from "./routes/driverRouter.js";
import busRouter from "./routes/busRouter.js";

// PORT do servidor:
const PORT = process.env.PORT;

// Inicializar Express.js:
const app = express();

// Usando Middleware:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ouvidor/Listener:
app.listen(PORT, () => {
  console.clear();
  console.log("Bem vindo à BusTrack API!");
  console.log(`Servidor no PORT: ${PORT} 🚀 \nVersão: 0.1.0 🛠️ \n`);
});

// Inserindo as rotas criadas:
app.use("/linhas", lineRouter)
app.use("/motoristas", driverRouter)
app.use("/onibus", busRouter)