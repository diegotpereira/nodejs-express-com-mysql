const Cliente = require("../modelo/cliente.modelo.js");

// criar e salvar um novo cliente
exports.criar = (req, res) => {
    //Validar pedido
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    // criar um cliente
    const cliente = new Cliente({
        email: req.body.email,
        nome: req.body.nome,
        ativo: req.body.ativo
    });

    // Salvar cliente no banco de dados
    Cliente.criar(cliente, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocorreu algum erro ao criar o cliente"
            });
        else res.send(data);
    });
};

// recuperar todos clientes do banco de dados
exports.encontrarTodos = (req, res) => {
    Cliente.bucarTodos((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Encontre um único cliente com um customerId
exports.bucarUm = (req, res) => {
    Cliente.buscarPorId(req.params.clienteId, (err, data) => {
        if (err) {
            if (err.kind === "nao_encontrado") {
                res.status(404).send({
                    message: `Não encontrado cliente com id ${req.params.clienteId}.`
                });
            } else {
                res.status(500).send({
                    message: "Erro ao recuperar Cliente com id " + req.params.clienteId
                });
            }
        } else res.send(data);
    });
};


// Atualizar um cliente identificado pelo customerId na solicitação
exports.atualizar = (req, res) => {
    // validar requisição
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }
    Cliente.atualizarPorid(
        req.params.clienteId,
        new Cliente(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "nao_encontrado") {
                    res.status(404).send({
                        message: `Não encontrado Cliente com id ${req.params.clienteId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar Cliente com id " + req.params.clienteId
                    });
                }
            } else res.send(data);
        }
    );
};

// deletar cliente por id 
exports.deletar = (req, res) => {
    Cliente.remover(req.params.clienteId, (err, data) => {
        if (err) {
            if (err.kind === "nao_encontrado") {
                res.status(404).send({
                    message: `Não encontrado cliente com id ${req.params.clienteId}.`
                });
            } else {
                res.status(500).send({
                    message: "Não foi possível excluir o cliente com id" + req.params.clienteId
                });
            }
        } else res.send({ message: `Cliente foi deletado com sucesso!` });
    });
};

exports.deletarTodos = (req, res) => {
    Cliente.removerTodos((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro ao remover todos os clientes."
            });
        } else res.send({ message: `Todos os clientes foram excluídos com sucesso!` });
    });
};