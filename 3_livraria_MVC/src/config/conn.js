import "dotenv/config";
import mysql from "mysql2";

const conn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

/* Unused connection module: */
// conn.connect((err) => {
//   if (err) {
//     return console.error(err.stack);
//   }
//   console.log("[Banco de dados conectado com sucesso.]");
// });

export default conn;