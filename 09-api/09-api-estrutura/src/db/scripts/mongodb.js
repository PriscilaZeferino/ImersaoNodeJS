//docker ps
//docker exec -it 38f88dc2cd99 mongo -u admin -p admin --authenticationDatabase admin

//database
//show dbs

//mudando o contexto para um database especifico
//use herois

//mostrar tabelas (coleções)
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//resultado da consulta
db.herois.find() 

//resultado da consula formatadpo
db.herois.find().pretty()

for(let i = 0; i <= 5000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

//Limite de 1000 registros ordenados de forma ascendente
db.herois.find().limit(1000).sort({nome: -1}) 

// exibir coluna especifica e ocultar o id
db.herois.find({}, {poder: 1, _id: 0})

//create
db.herois.insert({
    nome: `Clone-${i}`,
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read
db.herois.find({})

//update
//ele remove os outros campos nao atualizados
db.herois.update({_id:  ObjectId("6294b73610d7ebd44be3dad4")}, {nome: 'Mulher maravilha'}) 

//alterar so o nome especificamente e nao mexer nos outros campos
db.herois.update({_id:  ObjectId("6294b73610d7ebd44be3dad4")}, { $set: {nome: 'Mulher Maravilha'}})
//se vc errar o nome do campo, ele vai adicionar um novo campo e nao vai te avisar

//Não deixa atualizar varios ao mesmo tempo
db.herois.update({poder: 'Velocidade' }, { $set: {poder: 'superforça'}})

//delete
db.herois.remove({}) //apaga toda a base de dados
db.herois.remove({nome: 'Mulher Maravilha'}) //apaga alguem especifico