
# client-api

Microsserviço responsável pela gestão de pessoas.


## Documentação da API

```http
POST   /person - Cadastrar uma pessoa.
GET    /person/[id] - Consultar uma pessoa.
GET    /person/documentNumber/[documentNumber] - Consultar uma pessoa via CPF.
```

A documentação completa desse microsserviço está disponível [aqui](https://documenter.getpostman.com/view/7620522/2s8ZDa1LoC#408c0205-a206-490e-863d-d2e630656ccb).
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu `.env`

```env
CLIENT_DB_URL=<URI de conexão com MongoDb>
```


## Rodando localmente

Entre no diretório do projeto

```bash
  cd client-api
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