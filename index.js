const express = require("express");
const app = express();

// ROTA
// Method HTTP - CRUD (CREATE, READ, UPDATE, DELETE)
// GET - Pega uma info
// POST - Cria uma info
// PUT - Altera toda a info
// PATH - Altera parte da info
// DELETE - Apaga uma info

// Name - Um identificador da rota ----> "/"

// Function (Callback) - Responsavel por executar algum comando

app.get("/", function (req, res) {
  const soma = 2 + 3
  res.send({soma: soma});
});

app.listen(3000);
