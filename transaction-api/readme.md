
# transaction-api

Microsserviço responsável pela gestão de transações de uma conta.


## Documentação da API

```http
POST   /transaction/deposit - Realizar um depósito.
POST   /transaction/withdraw - Realizar um saque.
POST   /transaction/account/[id]/balance - Consultar o saldo de uma conta.
POST   /transaction/account/[id]/statement - Consultar o extrato de uma conta.
```

A documentação completa desse microsserviço está disponível [aqui](https://documenter.getpostman.com/view/7620522/2s8ZDa1LoC#bbe864e9-5a02-4d51-b39b-afc23285f75f).

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu `.env`

```env
ACCOUNT_API_URL=<url para aplicação account-api>
TRANSACTION_DB_URL=<URI de conexão com MongoDb>
```


## Rodando localmente

Entre no diretório do projeto

```bash
  cd transaction-api
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```


## Rodando com Docker

Recomende-se que utilize o `docker-compose.yml` que existe no projeto principal.