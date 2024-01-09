const ICrud = require('./interface/interfaceCrud')

class Postgres extends ICrud {
    constructor(){
        super()
    }

    create(item) {
        console.log("Item salvo com sucesso em Postgres")
    }
}

module.exports = Postgres