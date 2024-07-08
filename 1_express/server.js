// Importa o módulo do Express.js:
import express from "express";

// Cria uma porta para o servidor
const PORT = 3333;

// Atribui uma função Express à constante app
const app = express();

app.get("/users", (req, res) => {
  res.status(200).json({ msg: "GET" });
});

app.post("/post", (req, res) => {
  res.status(200).json({ msg: "POST" });
});

app.put("/put", (req, res) => {
  res.status(200).json({ msg: "PUT" });
});

app.patch("/patch", (req, res) => {
  res.status(200).json({ msg: "GET" });
});

app.get("/delete", (req, res) => {
  res.status(200).json({ msg: "DELETE" });
});

// Atribuir a porta em que o servidor deve ser iniciado e a sua resposta
app.listen(PORT, () => {
  console.log(`Hello Express.js! \nServer on PORT: ${PORT}`);
});
