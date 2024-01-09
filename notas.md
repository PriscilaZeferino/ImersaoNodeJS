# Módulo 00 - Introdução

## o que nao é o NODE.JS?
    - Não é uma linguagem de programação
    - Não é uma ferramenta de criação de sites simples
    - Não é um framework JavaScript
    - Não é uma ferramenta apenas para criação de aplicações frontend

## o que é  NODE.JS
    - É uma aplicação para construção de aplicações robustas em backend usando javascript.
    - Criando em 2009 para resolver o problema de upload de imagens por Ryan Dall
    - Usado também para construção de ferramentas de linha de comando 

## NPM
    - Gerenciador de dependecias javascript
    - Identifica dependencias a partir do arquivo package.json
    - Usado também para executar scripts bash a partir de seu projeto


## URLS
    - site do npm - node package manager

## Inicializando um projeto nodejs
    - mkdir aula01 - cria uma pasta
        - cd aula01 - entra na pasta
            - npm init -y

            adicionar dev no scripts
            - npm run dev - executa o projeto

# Modulo 02 - Introdução ao capítulo

## maquina virtual js 
    - javascript trabalhando
    - bind node transformando javascript pra c++
    - single thread para manipulacaod eventos, mas o sistema operacional que trabalha com multiplas threads.
    - v8
    - event loop

## ciclo de vida javascript
    - Funções que dependem de execução externas serão executadas no background
    - Aforma com que seu código é escrito é diferente da ordem em que é executado
    - Importante sempre manter a ordem da sua execução para evitar problemas

## trabalhando com callbacks
    - o codigo fica muito robusto

## promisses

### ciclo de vida promisses
    - *Pending*: Estado inicial, ainda nao terminou ou ainda nao foi rejeitado
    - *Fulfilled*: Quando executou todas as operações com sucesso
    = *Rejected*: quando a operacao falhou

### Promises - async await

    - facilita a visualizacao do fluxo de execucai
    - nao altera o fluxo ou a performance se for usado nos momentos certos
    - veio da galera do c#
    - nao é preciso utilizar async e await em todas as funcoes
    - retorna respostas uma unica vez

## EVENT EMITTER
    - Usado para ações continuas
    - nodeJs usa para quase tudo em seu ecossistema
    - Bastante usado nos browser (onclick)
    - trabalha sobre o design patter observer/pubsub
## Modulo 02 - manipulacao de listas
    - npm install dependecias - instala modulos
    
## Modulo 03 -tests
    - npm install -g mocha //instalar global
    - npm install --save-dev mocha //instala como dependencia de desenvolviemnto

## Módulo 04 - CLI//outra forma de obter dados do json
//const dadosJSON = require('./herois.json')
        /** Cadastrar
         * {
         * nome: flash
         * poder:speed
         * }
         * 
         * {
         * id: 13132
         * }
         * {
         *  nome: Flash
         *  poder:speed
         * id: 1
         * }
         */
         //OK - so diz se veio o objeto ou nao
//DeepEqual - verifica se ele é completamente igual ao objeto esperado

- Adicionar o -W no script do package json deixa o arquivo verificando as atualizacoes automaticamente
    - "test": mocha -w

    - Minhas sugestoes de Tasks para mim
        [ ] Corrigir o teste para que eles nao quebrem quando os dados forem atualizados
        [ ] Atualizar a classe Database para atualizar o id de modo aleatório - biblioteca uuid.
        [ ] Atualizar para busca de heroi pelo ID, nome, ou poder
## Modulo - docker
    - instalacao do docker
    - repositorio de imagens
        é como um cd de imagens/pacotes


##
docker rm ${docker ps -aq} //apaga todos os containers


//apagar node modules - rm -rf node_modules