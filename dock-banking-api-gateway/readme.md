
# dock-account-api

Microsserviço responsável por ser o api-gateway que irá redirecionar requisições.

## Documentação da API

```http
Request   /person - Redireciona para dock-client-api/person.
Request   /account - Redireciona para dock-account-api/account.
Request   /transaction - Redireciona para dock-transaction-api/transaction.
```

A documentação completa desse microsserviço está disponível [aqui](https://documenter.getpostman.com/view/7620522/2s8ZDa1LoC).

## Rodando localmente

**TODO** Pendente instruções: Necessário rodar Nginx no seu ambiente, utilizando a configuração padrão localizada em [nginx.conf](nginx.conf)

## Rodando com Docker

Recomende-se que utilize o `docker-compose.yml` que existe no projeto principal.