/*const express = require("express");
const connectDatabase = require("./src/database/db")
const userRoute = require('./src/routes/user.route')*/

import express from "express"
import connectDatabase from "./src/database/db.js"
import dotenv from "dotenv"

import userRoute from "./src/routes/user.route.js"
import authRoute from "./src/routes/auth.route.js"
import newsRoute from "./src/routes/news.route.js"

dotenv.config()

const port = process.env.PORT || 3000
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
app.use("/auth", authRoute)
app.use("/news", newsRoute)


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
