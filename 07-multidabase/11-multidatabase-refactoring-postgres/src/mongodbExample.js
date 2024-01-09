//Conexão com o banco de dados
//docker exec -it 38f88dc2cd99 mongo -u admin -p admin --authenticationDatabase admin

//npm install mongoose
const Mongoose = require("mongoose");

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

// setTimeout(()=> {
//     const state = Mongoose.connection.readyState
//     console.log(state)
// }, 1000)

// 0 - Desconectado
// 1 - Conectado
// 2 - Conectando
// 3 - Desconectando

const heroisSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  poder: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: new Date()
}
});

const model = Mongoose.model('herois', heroisSchema)

async function main() {
    const  resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })

    console.log('result cadastrar', resultCadastrar)

    const listItems = await model.find()
    console.log('items', listItems)
}

main()