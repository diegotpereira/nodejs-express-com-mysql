// const clienteRotas = require("../rotas/cliente.rotas.js");
const sql = require("./bancoDados.js");

// construtor
const Cliente = function(cliente) {
    this.email = cliente.email;
    this.nome = cliente.nome;
    this.ativo = cliente.ativo;
};

// inserir na tabela
Cliente.criar = (novoCliente, result) => {
    sql.query("INSERT INTO clientes SET ?", novoCliente, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("cliente criado: ", { id: res.inserirId, ...novoCliente });
        result(null, { id: res.inserirId, ...novoCliente });
    });
};

// buscar por id 
Cliente.buscarPorId = (clienteId, result) => {
    sql.query(`SELECT * FROM clientes WHERE id = ${clienteId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("cliente encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Cliente não encontrado com o id
        result({ kind: "nao_encontrado" }, null);
    });
};

// buscar todos os clientes 
Cliente.bucarTodos = result => {
    sql.query("SELECT * FROM clientes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("clientes: ", res);
        result(null, res);
    });
};

// atualizar cliente por id 
Cliente.atualizarPorid = (id, cliente, result) => {
    sql.query("UPDATE clientes SET email = ?, nome = ?, ativo = ? WHERE id = ?", [cliente.email, cliente.nome, cliente.ativo, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // não encontrado cliente com id 
                result({ kind: "nao_encontrado" }, null);
                return;
            }
            console.log("Cliente atualizado: ", { id: id, ...cliente });
            result(null, { id: id, ...cliente });
        });;
};

// remover cliente por id 
Cliente.remover = (id, result) => {
    sql.query("DELETE FROM clientes WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // não encontrado cliente com id 
            result({ kind: "nao_encontrado " }, null);
            return;
        }
        console.log("deletado cliente com id: ", id);
        result(null, res);
    });
};

Cliente.removerTodos = result => {
    sql.query("DELETE FROM clientes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deletado ${res.affectedRows} clientes`);
        result(null, res);
    });
};
module.exports = Cliente;