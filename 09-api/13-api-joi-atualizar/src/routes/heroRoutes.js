const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction =  (request, headers, erro) => {
    throw erro;
}

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    //payload -> body
                    //headers -> header
                    //params -> url_id
                    // query 
                    failAction: failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const {skip, limit, nome} = request.query;

                    const query = nome ? {nome: {$regex: `.*${nome}*.`}}: {};

                    return this.db.read(query, skip, limit)

                } catch (error) {
                    return 'Erro interno do servidor'
                }
            }
        }
    }

    create(){
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction: failAction,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            }, 
            handler:async (request) => {
                try {
                    const {nome, poder} = request.payload;
                    const result = await this.db.create({nome, poder}) 
                    return {
                        message: "Heroi cadastrado com sucesso!",
                        _id: result._id
                    }
                } catch (error) {
                    console.error("ERRO: ", error)
                    return 'Internal Error'
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                      },
                    payload: {
                        nome: Joi.string().max(100),
                        poder: Joi.string().max(30)
                    },
                    params: {
                        id: Joi.string().required()
                    }
                },

            },
            handler: async (request, headers) => {
                const payload = request.payload;
                const id = request.params.id;
                const dadosString = JSON.stringify(payload)
                const dados = JSON.parse(dadosString)
                const result = await this.db.update(id, dados)

                if(result.modifiedCount !== 1) return {
                    message: 'Não foi possivel atualizar'
                }

                return {
                    message: 'Heroi atualizado com sucesso!'
                }
            }
        }
    }
}

module.exports = HeroRoutes;