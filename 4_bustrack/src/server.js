// Dependências:
import "dotenv/config";
import express from "express";

// Modelos de entidade:

// Módulos de rotas:

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
