const ICrud = require('./interface/interfaceCrud')
class MongoDB extends ICrud{
    constructor(){
        super()
    }

    create(item) {
        console.log("Item salvo com sucesso em MongoDB")
    }
}

module.exports = MongoDB