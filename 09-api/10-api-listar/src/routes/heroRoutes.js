const BaseRoute = require('./base/baseRoute')
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const {skip, limit, nome} = request.query;
                    let query = {};
                    if(nome) {
                        query.nome = nome;
                    }

                    if(isNaN(skip) && skip) {
                        throw Error('O tipo do skip é incorreto') 
                    }

                    if(isNaN(limit)&& limit) {
                        throw Error('O tipo do limit é incorreto') 
                    }

                    return this.db.read(query, skip, limit)

                } catch (error) {
                    return 'Erro interno do servidor'
                }
            }
        }
    }
}

module.exports = HeroRoutes;