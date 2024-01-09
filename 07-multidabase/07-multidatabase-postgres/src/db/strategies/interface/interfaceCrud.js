//classe de erro para quando um método não foi implementado
class NotImplementedException extends Error {
    constructor() {
      super("Not Implemented Exception");
    }
}

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

  module.exports = ICrud