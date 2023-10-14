let { contas, id } = require('../banco_de_dados/bancodedados');
const { banco: { senha } } = require('../banco_de_dados/bancodedados');
const { contas: { saldo } } = require('../banco_de_dados/bancodedados');
const { saques, depositos, transferencias } = require('../banco_de_dados/bancodedados');


const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Algum dado não foi informado.' });
    }
    const encontrarCPF = contas.find((dado) => {
        return cpf === dado.usuario.cpf
    });

    if (encontrarCPF) {
        return res.status(400).json({ mensagem: 'Esse CPF já existe.' });
    }

    const encontrarEmail = contas.find((dado) => {
        return email === dado.usuario.email
    });

    if (encontrarEmail) {
        return res.status(400).json({ mensagem: 'Esse email já existe.' });
    }

    const conta = {
        numero: ++id,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(conta);
    return res.status(201).json();
}

const listarContas = (req, res) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'A senha não foi informada.' });
    }

    if (senha_banco !== senha) {
        return res.status(403).json({ "mensagem": "A senha do banco informada é inválida!" });
    } else {
        return res.status(200).json(contas);
    }

}

const atualizarUsuarioConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Algum dado não foi informado.' });
    }

    const encontrarUsuario = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    });


    if (!encontrarUsuario) {
        return res.status(404).json({ mensagem: 'Conta de usuário não encontrada' })
    }

    const encontrarCPF = contas.find((dado) => {
        return cpf === dado.usuario.cpf
    });

    if (encontrarCPF) {
        return res.status(400).json({ mensagem: 'Esse CPF já existe.' });
    }

    const encontrarEmail = contas.find((dado) => {
        return email === dado.usuario.email
    });

    if (encontrarEmail) {
        return res.status(400).json({ mensagem: 'Esse email já existe.' });
    }

    encontrarUsuario.usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    };
    return res.status(204).json();
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const encontrarUsuario = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    });

    if (!encontrarUsuario) {
        return res.status(404).json({ mensagem: 'Conta de usuário não encontrada' })
    }

    if (encontrarUsuario.saldo !== 0) {
        return res.status(403).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' })
    }

    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    });

    return res.status(204).json();

}

const saldoConta = (req, res) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'Algum dado não foi informado.' });
    }

    const encontrarUsuario = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    });

    if (!encontrarUsuario) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada' })
    }

    if (encontrarUsuario.usuario.senha !== senha) {
        return res.status(403).json({ "mensagem": "Senha inválida!" });
    }

    const saldo = encontrarUsuario.saldo;
    return res.status(200).json({ saldo: saldo });

}

const extratoConta = (req, res) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'Algum dado não foi informado.' });
    }

    const encontrarUsuario = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    });

    if (!encontrarUsuario) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada' })
    }

    if (encontrarUsuario.usuario.senha !== senha) {
        return res.status(403).json({ "mensagem": "Senha inválida!" });
    }

    const operacoes = {
        depositos: depositos.filter((deposito) => deposito.numero_conta === numero_conta),
        saques: saques.filter((saque) => saque.numero_conta === numero_conta),
        transferenciasEnviadas: transferencias.filter((transferencia) => transferencia.numero_conta_origem === numero_conta),
        transferenciasRecebidas: transferencias.filter((transferencia) => transferencia.numero_conta_destino === numero_conta),
    }

    return res.status(200).json(operacoes);
}

module.exports = {
    criarConta,
    listarContas,
    atualizarUsuarioConta,
    excluirConta,
    saldoConta,
    extratoConta

}