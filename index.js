/*const express = require("express");
const connectDatabase = require("./src/database/db")
const userRoute = require('./src/routes/user.route')*/

import express from "express"
import connectDatabase from "./src/database/db.js"
import userRoute from "./src/routes/user.route.js"

const port = 3000
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

connectDatabase()
app.use(express.json())
app.use("/user", userRoute)


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
