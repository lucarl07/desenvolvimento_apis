// Dependencies:
import "dotenv/config";
import express, { application } from "express";

// Database models:
import "./models/livroModel.js";
import "./models/funcionarioModel.js";
import "./models/clienteModel.js";
import "./models/emprestimoModel.js";

// Route modules:
import defRoute from "./routes/defRoute.js";
import livroRoutes from "./routes/livroRoutes.js";
import funcionarioRoutes from "./routes/funcionarioRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";

// Server Port:
const PORT = process.env.PORT;

// Initialize Express app:
const app = express();

// Using Middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// App Listener:
app.listen(PORT, () => {
  console.clear();
  console.log("Bem vindo à livraria API 2.1.0!");
  console.log(`Server on PORT: ${PORT} 🚀\n`);
});

// Using the established routes:
app.use("/", defRoute);
app.use("/livros", livroRoutes);
app.use("/funcionarios", funcionarioRoutes);
app.use("/clientes", clienteRoutes);
