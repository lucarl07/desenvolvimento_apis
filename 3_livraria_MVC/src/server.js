// Dependencies:
import "dotenv/config";
import express, { application } from "express";

// API Modules:
import conn from "./config/conn.js";

// Database models:
import "./models/livroModel.js";
import "./models/funcionarioModel.js";

const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  console.log("Olá mundo!");
});

app.listen(PORT, () => {
  console.clear();
  console.log("Bem vindo à 2_2_livraria_MVC API!");
  console.log(`Server on PORT: ${PORT} 🚀\n`);
});
