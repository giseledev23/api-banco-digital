const express = require('express');

const rotas = express();

const { criarConta, listarContas, atualizarUsuarioConta, excluirConta, saldoConta, extratoConta } = require('./controladores/controladores_contas.js');

const { depositar, sacar, transferir } = require('./controladores/controladores_transacoes.js');

rotas.post('/contas', criarConta);

rotas.get('/contas', listarContas);

rotas.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);

rotas.delete('/contas/:numeroConta', excluirConta);

rotas.post('/transacoes/depositar', depositar);

rotas.post('/transacoes/sacar', sacar);

rotas.post('/transacoes/transferir', transferir);

rotas.get('/contas/saldo', saldoConta);

rotas.get('/contas/extrato', extratoConta);

module.exports = rotas; 