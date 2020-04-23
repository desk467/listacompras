# listacompras

## Introdução

O objetivo deste web service é permitir gerenciar listas de compras a partir de uma API REST escrita em NodeJS + Express.

O projeto contém rotas para
- Gerenciar listas de compras (CRUD)
- Gerenciar os itens das listas


## Configuração do ambiente

Para executar este projeto, você precisará ter instalado o NodeJS 12.x.
Recomendo fazer a instalação via [NVM](https://github.com/nvm-sh/nvm).

Este projeto também utiliza o Yarn como gerenciador de dependências. Você pode ver mais sobre ele clicando [aqui](https://classic.yarnpkg.com/lang/en/)

Feito a instalação, baixe as dependências, executando `yarn` na raiz do repo. e faça a configuração das variáveis de ambiente com a criação de um arquivo .env

**dotenv**

Este projeto está preparado para carregar algumas configurações via variáveis de ambiente. Você pode configurar estas variáveis
através de um arquivo `.env` que você pode criar na raiz do projeto.
As variáveis que o projeto utiliza são:

- `DATABASE_PATH`: Caminho onde o banco de dados SQLite será criado.
- `PORT`: A porta que o web service irá utilizar
- `SECRET`: A chave segredo utilizada para gerar os tokens

**vscode**

O repositório contém uma pasta `.vscode` que inclui algumas configurações que o Visual Studio Code pode utilizar para facilitar o desenvolvimento, tais como debug. Para saber mais sobre a IDE, [clique aqui](https://code.visualstudio.com/). A utilização desta IDE não é obrigatória, mas auxiliará no desenvolvimento.

**Insomnia**

Este projeto inclui um arquivo chamado **Insomnia.json** na raiz, que pode ser importado pelo REST Client [Insomnia](https://insomnia.rest/). Ao importar este arquivo, você terá acesso a todas as rotas, bem como a documentação delas para facilitar o desenvolvimento.

**.editorconfig**

Há um arquivo `.editorconfig` com alguns padrões estabelecidos de edição dos arquivos, como identação, charset etc. Caso você esteja utilizando o vscode, é interessante baixar a extensão `EditorConfig for VS Code`.
Para instalar, abra o VS Code, execute Ctrl + P e digite:

```
$ ext install EditorConfig
```

Daí é so aguardar a instalação ;)

## Para executar

Para executar este web service, após baixar as dependências com o yarn, execute:

```sh
$ yarn start
```

... e o projeto irá iniciar.

## Estrutura do projeto

A estrutura deste repo. segue um padrão *MVC*, onde:

- As rotas são definidas no arquivo `routes.ts`
- Cada controller lida com um tipo de recurso e possui no máximo, os métodos:
    - index
    - show
    - new
    - edit
    - delete
- Cada rota pode possuir um método `validate` e um tipo que define o `body` da requisição
- Cada controller exporta como default uma instância
- O banco é definido pelo ORM `sequelize`, seguindo o padrão ActiveRecord e cada tabela é definida como um model na pasta models

Além disso, podem ser definidos middlewares que executarão para várias rotas (como é o caso do `AuthorizationMiddleware`) e a ordem de execução também é definida no `routes.ts`.

Por fim, este projeto está configurado para utilizar a lib `module-alias`, que permite definir apelidos para caminhos de módulos. Os principais módulos do projeto estão marcados com aliases, ou seja, ao invés de executar:

```ts
import User from '../../../models/User'

```

... voce fará:

```ts
import User from '@models/User'
```

## Padrões de nomenclatura

Para facilitar o desenvolvimento, alguns padrões de nomenclatura foram definidos ao longo do projeto, tais como:

- Nomes de classes, interfaces e middlewares em `PascalCase`
- Nomes de instancias e métodos em `camelCase`
- Nomes de arquivos em `kebab-case`

## Como contribuir

Este repo. possui algumas configurações para facilitar o processo de contribuição, tais como:

**Padrão de commits**

Utilizo o padrão do Karma para commits. Você pode ver mais sobre ele [clicando aqui](https://karma-runner.github.io/4.0/dev/git-commit-msg.html)

É importante seguir o padrão para facilitar a busca de commits posterior. O projeto está configurado para aplicar Git Hooks, sendo um deles, um validador da mensagem do commit.
Escrever uma mensagem fora do padrão bloqueará de finalizar o commit ;)