
# banking-api

Desafio técnico com a finalidade de desenvolvimento de uma aplicação bancária.



## Arquitetura

A arquitetura escolhida pra esse projeto foi de microsserviço, onde é separado os microsserviços essenciais da aplicação
com um api gateway para unificar os endpoints.

<img src="arquitetura.png" alt="arquitetura" width="500"/>

## Stack utilizada

**banking-api-gateway:** Nginx

**client-api:** NodeJS, Express, Mongoose

**account-api:** Node, Express, Mongoose

**transaction-api:** Node, Express, Mongoose

**database:** MongoDB


## Documentação da API

A documentação da API é gerada via Postman.

```http
POST /person - Cadastrar uma pessoa.
POST /account - Cadastrar uma conta.
POST /transaction/deposit - Fazer um depósito.
POST /transaction/withdraw - Fazer um saque.
GET  /transaction/account/[id]/statement - Consultar extrato bancário.
...
```

Documentação completa está disponível [aqui](https://documenter.getpostman.com/view/7620522/2s8ZDcyzdN).

## Rodando localmente

Para cada aplicação, um serviço diferente numa porta diferente.
```
banking-api-gateway - localhost:3000 //TODO: disponibilizar configuração para Nginx
client-api          - localhost:3001
account-api         - localhost:3002
transaction-api     - localhost:3003
```

### Local

Para cada aplicação, exceto `banking-api-gateway`, rodar os comandos abaixo:

```shell
$ cd client-api/ #account-api ou transaction-api
$ npm install
$ npm start
```

### Docker

Na pasta principal possui um `docker-compose.yml` onde é necessário apenas rodar `docker-compose up` para iniciar as aplicações.

```shell
$ docker-compose up --build
```

Caso queira iniciar com [mongo-express](https://github.com/mongo-express/mongo-express), apenas para testes e consulta ao banco, inicie com o profile `debug`.

```shell
$ docker-compose --profile debug up --build
```

Recomende-se o uso do [postman](#postman) abaixo sobre testes dos endpoints.


## Testes

### Postman

Para testes da aplicação, é possível com auxílio do [postman](/postman/), onde será possível testar todos os endpoints.

Todo o postman está configurado para facilitar criação de recurso:
- Dados são gerados aleatoriamente (tipo CPF) ou pré definidos;
- IDs dos últimos recursos são salvos em variáveis que são utilizados pelos demais endpoints.
Criando assim, um fluxo de execução de endpoints:
    ```
    Criar uma pessoa.
    ┣ Pegar dados da pessoa.
    ┣ Pegar dados de pessoa através do endpoint de CPF.
    ┗ Criar uma conta bancária.
      ┣ Pegar dados da conta bancária.
      ┣ Pegar dados da conta bancária através de números de agência e conta.
      ┣ Consultar saldo.
      ┣ Consultar extrato.
      ┣ Bloquear/Desbloquear uma conta bancária.
      ┣ Desativar uma conta bancária.
      ┗ Realizar uma transação de depósito/saque.
        ┗ Pegar dados da transação.
    ```
Dentro da pasta, possui uma collection e como importar e usa-las.