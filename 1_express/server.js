// Importa o módulo do Express.js:
import express from "express";

// Cria uma porta para o servidor
const PORT = 3333;

// Atribui uma função Express à constante app
const app = express();

// Rotas:
/** Tipos de HTTP Requests:
 * query params - ...:3333/pessoas?nome="Luiz"&idade=17
 *  ↪  Rotas do tipo GET (filtros e buscas)
 * route params - ...:3333/pessoas/5929
 *  ↪  Rotas do tipo GET, PUT, PATCH e DELETE (listar um elemento)
 * body params - ...:3333/pessoas
 *  ↪  Rotas do tipo POST (cadastro de informações)
 */

app.get("/users", (req, res) => {
  res.status(200).json(["Pessoa 1", "Pessoa 2", "Pessoa 3"]);
});

app.post("/users", (req, res) => {
  res.status(201).json(["Pessoa 1", "Pessoa 2", "Pessoa 3", "Pessoa 4"]);
});

app.put("/users", (req, res) => {
  res.status(200).json(["Pessoa 1", "Pessoa 2", "Pessoa 3", "Pessoa 10"]);
});

app.delete("/users", (req, res) => {
  res.status(204).json("Task completed succesfully!");
});

// Atribuir a porta em que o servidor deve ser iniciado e a sua resposta
app.listen(PORT, () => {
  console.log(`Hello Express.js! \nServer on PORT: ${PORT}`);
});
