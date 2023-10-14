let { contas, id, depositos, saques, transferencias } = require('../banco_de_dados/bancodedados');
const { banco: { senha } } = require('../banco_de_dados/bancodedados');
let { contas: { saldo } } = require('../banco_de_dados/bancodedados');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' });
    }

    const encontrarUsuario = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    });

    if (!encontrarUsuario) {
        return res.status(404).json({ mensagem: 'Conta de usuário não encontrada.' })
    }

    if (typeof valor !== 'number' || valor <= 0) {
        return res.status(400).json({ mensagem: 'Valor de depósito inválido.' })

    }

    const deposito = {
        data: new Date().toLocaleString(),
        numero_conta,
        valor
    }
    encontrarUsuario.saldo += valor;
    depositos.push(deposito);
    return res.status(201).json();


}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, o valor e a senha são obrigatórios!' });
    }

    const encontrarUsuario = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    });

    if (!encontrarUsuario) {
        return res.status(404).json({ mensagem: 'Conta de usuário não encontrada.' })
    }

    if (typeof valor !== 'number' || valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor para saque precisa ser maior do que zero.' })

    }

    if (encontrarUsuario.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha inválida.' })
    }

    if (valor > encontrarUsuario.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente.' })
    }

    const saque = {
        data: new Date().toLocaleString(),
        numero_conta,
        valor
    }

    encontrarUsuario.saldo -= valor;
    saques.push(saque);
    return res.status(201).json();

}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta de origem, o número da conta de destino, o valor e a senha são obrigatórios!' });
    }

    const encontrarUsuarioOrigem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem)
    });

    if (!encontrarUsuarioOrigem) {
        return res.status(404).json({ mensagem: 'Conta de usuário de origem não encontrada.' })
    }

    const encontrarUsuarioDestino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino)
    });

    if (!encontrarUsuarioDestino) {
        return res.status(404).json({ mensagem: 'Conta de usuário de destino não encontrada.' })
    }

    if (encontrarUsuarioOrigem.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha inválida.' })
    }

    if (valor > encontrarUsuarioOrigem.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente.' })
    }


    const transferencia = {
        data: new Date().toLocaleString(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    encontrarUsuarioOrigem.saldo -= valor;
    encontrarUsuarioDestino.saldo += valor;

    transferencias.push(transferencia);
    return res.status(201).json();
}


module.exports = {
    depositar,
    sacar,
    transferir

}