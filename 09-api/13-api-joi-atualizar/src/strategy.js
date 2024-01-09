//classe de erro para quando um método não foi implementado
class NotImplementedException extends Error {
  constructor() {
    super("Not Implemented Exception");
  }
}

//"interface"

class ICrud {
  create(item) {
    throw new NotImplementedException();
  }

  read(query) {
    throw new NotImplementedException();
  }

  update(id, item) {
    throw new NotImplementedException();
  }

  delete(item) {
    throw new NotImplementedException();
  }
}

class MongoDB extends ICrud{
    constructor(){
        super()
    }

    create(item) {
        console.log("Item salvo com sucesso em MongoDB")
    }
}

class Postgres extends ICrud {
    constructor(){
        super()
    }

    create(item) {
        console.log("Item salvo com sucesso em Postgres")
    }
}

//estratégia
class ContextStrategy {
  constructor(strategy) {
    this._database = strategy;
  }
  create(item){
    return this._database.create(item)
  }
  read(query){
      return this._database.read(item)
  }
  update(id, item){
      return this._database.update(id, item)
  }
  delete(id) {
      return this._database.delete(id)
  }
}

const contextMongo = new ContextStrategy(new MongoDB);
contextMongo.create()

const contextPostgres = new ContextStrategy(new MongoDB);
contextPostgres.create()