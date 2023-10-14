# API para um Banco Digital - README

### Por Gisele Cristina

Este é um projeto de uma API para um Banco Digital desenvolvido como parte de um desafio ao final do módulo 02 do curso de Desenvolvimento de Software foco em Backend da Cubos Academy. O projeto permite realizar várias operações bancárias, como criar contas, listar contas, atualizar dados do usuário, excluir contas, depositar, sacar, transferir valores, consultar saldo e emitir extratos.

## Como Usar

Siga as instruções abaixo para usar a API.

### Requisitos

- Node.js instalado
- Git instalado (opcional)

### Instalação

1. Clone este repositório (se você não tem o Git, você também pode baixar o arquivo ZIP e extrair).
   ```
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. Instale as dependências usando npm ou yarn.
   ```
   npm install
   ```

### Uso

1. Inicie o servidor.
   ```
   npm start
   ```

2. Acesse a API em [http://localhost:3000](http://localhost:3000).

### Endpoints

A API oferece os seguintes endpoints:

- **Listar Contas Bancárias** - `GET /contas?senha_banco={senha}`
- **Criar Conta Bancária** - `POST /contas`
- **Atualizar Usuário da Conta** - `PUT /contas/:numeroConta/usuario`
- **Excluir Conta** - `DELETE /contas/:numeroConta`
- **Depositar** - `POST /transacoes/depositar`
- **Sacar** - `POST /transacoes/sacar`
- **Transferir** - `POST /transacoes/transferir`
- **Consultar Saldo** - `GET /contas/saldo?numero_conta={numero}&senha={senha}`
- **Emitir Extrato** - `GET /contas/extrato?numero_conta={numero}&senha={senha}`

Lembre-se de seguir a documentação para fornecer os parâmetros corretos em cada solicitação.

### Funções Adicionais

- **Transferir Valores Entre Contas Bancárias** - `POST /transacoes/transferir`
- **Consultar Saldo da Conta Bancária** - `GET /contas/saldo?numero_conta={numero}&senha={senha}`
- **Emitir Extrato da Conta Bancária** - `GET /contas/extrato?numero_conta={numero}&senha={senha}`

### Exemplo de rotas

![image](https://github.com/giseledev23/api-banco-digital/assets/140963412/fd3b0ed0-e6ad-4288-8531-c559078141e3)


## Persistência de Dados

Os dados são armazenados em memória e gerenciados em um arquivo chamado `bancodedados.js`.

![image](https://github.com/giseledev23/api-banco-digital/assets/140963412/55191b8f-acc8-4f32-b203-b3a5102dfc69)


## Padrões e Boas Práticas

- Siga os padrões REST.
- Mantenha o código organizado com responsabilidades claras em arquivos específicos.
- Represente valores em centavos (Ex.: R$ 10,00 = 1000).
- Evite duplicação de código e considere centralizá-lo em funções.

## Códigos de Status

A API responde com os seguintes códigos de status:

- 200 (OK)
- 201 (Created)
- 204 (No Content)
- 400 (Bad Request)
- 401 (Unauthorized)
- 403 (Forbidden)
- 404 (Not Found)
- 500 (Internal Server Error)

## Para demais consultas 

Acesse o link do READ.me do repositório original:

https://github.com/giseledev23/desafio-backend-modulo-02-sistema-bancario-b2b-ifood-t11#readme
