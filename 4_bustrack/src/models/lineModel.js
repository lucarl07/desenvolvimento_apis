import conn from "../config/conn.js";

const tbLinhas = /*sql*/ `
  CREATE TABLE IF NOT EXISTS linhas (
    linha_id VARCHAR(60) PRIMARY KEY,
    nome_linha VARCHAR(255) NOT NULL,
    numero_linha INT(3) UNIQUE NOT NULL,
    itinerario VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

conn.query(tbLinhas, (err) => {
  if (err) {
    console.error("Erro ao criar a tabela: " + err.stack);
    return;
  }
  console.log('[API] Tabela "linhas" criada com sucesso.');
});
