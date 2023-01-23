
# dock-account-api

Microsserviço responsável pela gestão de contas de uma pessoa.


## Documentação da API

```http
POST   /account - Cadastrar uma conta digital dock.
GET    /account/[id] - Consultar uma conta digital dock.
GET    /account/[agency]/[number] - Consultar uma conta digital dock via agência e número da conta.
POST   /account/[id]/block - Bloquear uma conta.
DELETE /account/[id]/block - Desbloquear uma conta.
POST   /account/[id]/disable - Desativar uma conta.
```

A documentação completa desse microsserviço está disponível [aqui](https://documenter.getpostman.com/view/7620522/2s8ZDa1LoC#deef9887-d802-4982-bda5-17c164bb19de).
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu `.env`

```env
DOCK_CLIENT_API_URL=<url para aplicação dock-client-api>
DOCK_TRANSACTION_API_URL=<url para aplicação dock-transaction-api>
DOCK_ACCOUNT_DB_URL=<URI de conexão com MongoDb>
```


## Rodando localmente

Entre no diretório do projeto

```bash
  cd dock-account-api
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