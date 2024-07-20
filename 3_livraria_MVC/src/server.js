// Dependencies:
import "dotenv/config";
import express, { application } from "express";

// Database models:
import "./models/livroModel.js";
import "./models/funcionarioModel.js";

// Route modules:
import livroRoutes from "./routes/livroRoutes.js";

const PORT = process.env.PORT

const app = express();

app.listen(PORT, () => {
  console.clear();
  console.log("Bem vindo à 2_2_livraria_MVC API!");
  console.log(`Server on PORT: ${PORT} 🚀\n`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "Olá mundo! Bem vindo à 2_2_livraria_MVC API!",
    acesso: `http://localhost:${PORT}/`,
  });
});

app.use('/livros', livroRoutes)