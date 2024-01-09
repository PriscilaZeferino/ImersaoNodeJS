## ----POSTGRES----

``docker run --name postgres -e POSTGRES_USER=priscilayrz -e POSTGRES_PASSWORD=senha -e POSTGRES_DB=heroes -p 5432:5432 -d postgres``

- Se a imagem do docker nao estiver instalada na máquina, ele vai fazer o download automaticamente.

``docker ps``
- Pra visualizar se esta tudo certo na máquina

``docker exec -it postgres /bin/bash ``
- Entra no container e permite rodar qualquer comando lá dentro


### INSTÂNCIA CONCORRENTE - LINK O BANCO COM O POSTGRES

`` docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer ``


- link - permissão para acessar a imagem do postgres

- Acessar a porta 8080:8080 no localhost pelo navegador
    - Sistema - banco linkado (PostgreSQL)
    - Servidor - nome do serviço (postgres)
    - Usuario - nome criado (priscilayrz)
    - Senha - senha criada (senha)
    - Base de dados - nome do banco de dados (heroes)


## ----MONGODB----

`` docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -d mongo:4 ``
### INSTÂNCIA CONCORRENTE - CLIENTE PARA O BANCO DE DADOS

`` docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient ``


- Acessar a porta 3000:3000 no localhost pelo navegador
    - Criar uma conexão

        - Conecction
            - Conection name: mongodb 
            - Host: mongodb
            - Porta: 27017
            - database: admin
        - Authentication
            - Authentication type: Scram-Sha-1
            - Username: admin
            - Password: admin
            - Authentication DB: admin
    
    - Acessar a conexão
        - Criar um usuário
        `` docker exec -it mongodb mongo --host localhost -u admin -p admin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'priscilayrz', pwd: 'minhasenha',roles: [{role: 'readWrite', db: 'herois'}]})"``

        - Desconectar e conectar ao novo usuario
            - Connection name: mongodb-readWrite
            - host/port: mongodb
            - database: herois
            - Authentication: 
                - username: priscilayrz
                - password: minhasenha
                - authenticationDB: herois

    - Acessar o navegador e checa a conexão

## UTILS
docker ps -a //lista todos os comandos //Baixa a imagem do docker e configura o container
docker rm nomedocontainer //apaga o container

# DESIGN PATTERNS   
    - Criar estratégias para trabalhas
        - por exemplo, cadastrarUmHeroi em um db ou em outro conforme necessario
        
## SEQUELIZE
    - objeto ORM para consultas SQL
    - Instalar o Sequelize
    


//No JAVASCRIPT temos uma tecnica chamada spread/rest pra separar ou merger objetos.

//npm install joi