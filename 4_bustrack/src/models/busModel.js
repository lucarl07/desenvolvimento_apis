import conn from "../config/conn.js";

const tbOnibus = /*sql*/ `
  CREATE TABLE IF NOT EXISTS onibus (
    onibus_id VARCHAR(60) PRIMARY KEY,
    placa VARCHAR(8) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    ano_fabricacao YEAR(4) NOT NULL,
    capacidade INT NOT NULL,
    id_linha VARCHAR(60) NOT NULL,
    id_motorista VARCHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_linha) REFERENCES linhas(linha_id),
    FOREIGN KEY (id_motorista) REFERENCES motoristas(motorista_id)
  );
`;

conn.query(tbOnibus, (err) => {
  if (err) {
    console.error("Erro ao criar a tabela: " + err.stack);
    return;
  }
  console.log('[API] Tabela "onibus" criada com sucesso.');
});
