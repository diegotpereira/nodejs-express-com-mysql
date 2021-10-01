module.exports = app => {
    const clientes = require("../controle/cliente.controle.js");

    // Criar um novo Cliente 
    app.post("/clientes", clientes.criar);

    // rescuperar todos clientes 
    app.get("/clientes", clientes.encontrarTodos);

    // buscar um unico cliente com clienteid
    app.get("/clientes/:clienteId", clientes.bucarUm);

    // Atulizar um Cliente com clienteId
    app.put("/clientes/:clienteId", clientes.atualizar);

    // deletar cliente com clienteId 
    app.delete("/clientes/:clienteId", clientes.deletar);

    // deletar todos os clientes 
    app.delete("/clientes", clientes.deletarTodos);
};