
# Task manager InfinityBase

Esse é um projeto feito para o teste técnico da InfinityBase
O projeto consiste em um aplicativo web aonde de gerenciamento de tarefas (e.g. Trello, Jira, Clickup, etc).


## Pré-requisitos
Git

Docker

Docker-compose
## Tecnologias:

- React
- Typescript
- Zustand
- Docker
- Node
- Express
- TypeOrm

## Execução

Primeiro, faça o clone do repositório na sua máquina
```bash
  git clone https://github.com/ViniciusEvans/task-manager-infinitybase.git
```

Navegue até a pasta raíz do repositório e execute o docker-compose

```bash
  cd .\api\
  docker-compose up -d
```

Feito isso, os containers do docker serão criados em background e já será possível ter acesso à aplicação. Para utilizar a aplicação, acesse: http://localhost:8000/