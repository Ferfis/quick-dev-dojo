# Sobre o Projeto

Com base nos requisitos mínimos desenvolvi uma aplicação para compartilhamento de postagens entre os usuários cadastrados.\
Ele atende todos os requisitos solicitados tentando aplicar da melhor forma possível para fazer sentido no fluxo de navegação.

Para que a aplicação seja executada sem erros é necessário o instalar o node.js versão 18+ em seu sistema(https://nodejs.org/en/download/) e ter o mysql 5.7+ instalado em seu ambiente local.

# Stacks utilizadas (Client)
Para a interface com o cliente foi utilizado React JS versão 18, com as seguintes dependências de desenvolvimento:
- react-bootstrap para trazer maior agilidade no desenvolvimento das telas. Optei por familiaridade.
- react-icons para acesso a biblioteca de ícones.
- react-quill para utilizar editor wysiwyg.
- crypto-js para criprografar dados sensíveis como o IDs utilizando AES como padrão.
- redux para o gerenciamento de estados dos dados da aplicação.
- redux-persist para persistir os dados armazenados pelo redux em toda a aplicação.
- axios para realizaar as requisições para API em node.js.
- md5-hash para criar a hash no padrão md5 para senhas.
- react-router-dom para um melhor gerenciamento da navegação entre as rotas.

# Stacks utilizadas (SERVER)
O servidor foi desenvolvido em node.js versão 18.11 e optei pelo banco de dados Mysql. Minha primeira escolha foi utilizar Mongodb por ser uma aplicação pequena, mas na modelagem do banco de dados solicitava a criação de chaves estrangeiras, optei por MYSQL por familiaridade.\
A aplicação utiliza das seguintes dependências: 
- express para simplificar o processo da criação da API e suas rotas.
- axios para realizaar as requisições para API em node.js.
- body-parser para extração dos dados enviados nas requisições HTTP.
- cors para a tratativa das exceções e criações de regra para as políticas de acesso.
- dotenv para criação de variáveis de ambiente no arquivo .env armazenado na raiz do projeto.
- jsonwebtoken para a criação de token JWT, garantindo maior segurança no módulo de autenticação dos usuários.
- mysql2 para a manipulação do banco de dados MYSQL na aplicação.

## Iniciando o projeto CLIENT

Acessando o projeto no diretório "client" execute os comandos na ordem:

### 1- `yarn install`
### 2 - `npm start`

Abra [http://localhost:3000](http://localhost:3000) para visualizar o projeto.\

####Obs: Na raíz do projeto existe um arquivo chamado contants.js, ele é responsável por armazenar os valores globais com as URLs da API Node e a chave de criptografia utilizada no projeto.\ Caso a aplicação não encontre a rota para o servidor, verifique este arquivo.

####Obs: O relatório de postagens está disponível na seguinte url: 

## Iniciando o projeto CLIENT

Acessando o projeto no diretório "server" execute os comandos na ordem:
### 1- `yarn install`
### 2 - `node index.js`

A API ficará disponível na seguinte URL [http://localhost:3002](http://localhost:3002).\

####Obs: Na raíz do projeto existe um arquivo chamado .env, ele é responsável por armazenar os valores globais com as URLs da API Node e a chave de criptografia utilizada no projeto.\ Neste arquivo você pode definir a porta a ser utilizada em seu ambiente(padrão 3002).

####Obs2: Na raíz do projeto está o arquivo dump.sql já populado com alguns dados de teste. Basta importar para sua base de dados local utilizando sua IDE ou através de CLI seguindo os passos abaixo:
- Conecte-se ao servidor MySQL: mysql -u [username] -p[password]
- Selecione seu banco de dados: use [database_name];
- Importe a dump: source [dump_file.sql];

####Obs3: Para alterar as credenciais de acesso ao banco de dados, acessar o arquivo no seguinte caminho: /api/models/config.js
