import "dotenv/config"
import express, { application } from "express"

const PORT = process.env.PORT

const app = express()

app.get('/', (req, res) => {
  console.log('Olá mundo!')
})

app.listen(PORT, (req, res) => {
  console.clear()
  console.log('Bem vindo à 2_2_livraria_MVC API!')
  console.log(`Server on PORT: ${PORT} 🚀`)
})