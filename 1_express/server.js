// Importa o módulo do Express.js:
import express from "express";

// Importando dependências externas:
import { v4 as uuidv4 } from "uuid";

// Cria uma porta para o servidor
const PORT = 3333;

// Atribui uma função Express à constante app
const app = express();

// Aceitar JSON
app.use(express.json());

// Rotas:
/** Tipos de HTTP Requests:
 * query params - ...:3333/pessoas?nome="Luiz"&idade=17
 *  ↪  Rotas do tipo GET (filtros e buscas)
 * route params - ...:3333/pessoas/5929
 *  ↪  Rotas do tipo GET, PUT, PATCH e DELETE (listar um elemento)
 * body params - ...:3333/pessoas
 *  ↪  Rotas do tipo POST (cadastro de informações)
 */

// Criando o Middleware:
const logRoutes = (request, response, next) => {
  const { url, method } = request;
  const route = `[${method.toUpperCase()}] ${url}`;
  console.log(route);
  next();
};

// Implementando o Middleware em todas as rotas:
app.use(logRoutes);

const users = [];

// Usando Query Params no endpoint GET /users
app.get("/users", (req, res) => {
  const { nome, idade } = req.query;
  console.log(nome, idade);

  res.status(200).json(users);
});

app.post("/users", (req, res) => {
  const { nome, idade } = req.body;

  if (!nome) {
    res.status(400).json({ mensagem: '"nome" é um campo obrigatório.' });
    return;
  }
  if (!idade) {
    res.status(400).json({ mensagem: '"nome" é um campo obrigatório.' });
    return;
  }

  const user = {
    id: uuidv4(),
    nome,
    idade,
  };
  users.push(user);

  res.status(201).json({
    mensagem: `Usuário cadastrado com sucesso!`,
    usuario: user,
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;

  const index = users.findIndex(user => user.id === id)
  if (index == -1) {
    res.status(400).json({ mensagem: "Usuário não encontrado." })
    return;
  }

  const updtUser = {
    nome,
    idade
  }
  users[index] = {
    id: users[index].id,
    ...updtUser
  }

  res.status(200).json(users[index]);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  const index = users.findIndex(user => user.id === id)
  if (index == -1) {
    res.status(400).json({ 
      mensagem: `Usuário não encontrado. Talvez ele nunca tenha existido mesmo ¯\\_(ツ)_/¯` 
    })
    return;
  }

  users.splice(index, 1)
  res.status(204).send(`Usuário ${id} apagado com sucesso!`);
});

// Atribuir a porta em que o servidor deve ser iniciado e a sua resposta
app.listen(PORT, () => {
  console.log(`Hello Express.js! \nServer on PORT: ${PORT}`);
});
