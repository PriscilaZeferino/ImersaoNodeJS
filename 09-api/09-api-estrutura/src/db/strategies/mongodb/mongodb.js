const ICrud = require('../interface/interfaceCrud')

const Mongoose = require("mongoose");

const STATUS = {
    0: 'Desconectado',
    1:'Conectado',
    2:'Conectando',
    3:'Desconectando'
}

class MongoDB extends ICrud{
    constructor(connection, schema){
        super()
        this._schema = schema
        this._connection = connection
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if(state === 'Conectado') return state
        if(state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._connection.readyState]
    }


    static  connect() {
        Mongoose.connect(
            "mongodb://priscilayrz:minhasenha@localhost:27017/herois",
            {
              useNewUrlParser: true,
            },
            function (error) {
              if (!error) return;
              console.log("Falha na conexão!", error);
            }
          );
          
          const connection = Mongoose.connection;
          connection.once("open", () => console.log("Database is running! "));
          return connection
        }

    async create(item) {
        return this._schema.create(item) 
    }

    async read(item, skip, limit) {
      return this._schema.find(item).skip(skip).limit(limit)
    }

    async update(id, item) {
      const nome = item.nome;
      return this._schema.updateOne({_id: id}, {$set:{nome: nome}})
    }

    async delete(id) {
      return this._schema.deleteOne({_id: id});
    }
  }

module.exports = MongoDB