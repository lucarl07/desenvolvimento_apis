import conn from "../config/conn.js";

const tbFuncionarios = /*sql*/ `
  CREATE TABLE IF NOT EXISTS funcionarios(
    id VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    dt_contratacao DATE NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

conn.query(tbFuncionarios, (err) => {
  if (err) {
    console.error("Erro ao criar a tabela: " + err.stack);
    return;
  }
  console.log('[Tabela "funcionarios" criada com sucesso.]');
});
