import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
  console.clear();
  console.log(`📚  Bem-vindo à Livraria API! \n🚀  Servidor on PORT: ${PORT}`);
});
