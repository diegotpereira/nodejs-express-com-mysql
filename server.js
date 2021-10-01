const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// analisar pedidos de content-type: application/json 
app.use(bodyParser.json());

// analisar pedidos de content-type: application/x-www-form-irlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// rota simples
app.get("/", (req, res) => {
    res.json("Bem vindo a aplicação");
});

require("./app/rotas/cliente.rotas.js")(app);

// setar porta, ouvir pedidos
app.listen(3000, () => {
    console.log("O servidor está rodando na porta 3000.")
});