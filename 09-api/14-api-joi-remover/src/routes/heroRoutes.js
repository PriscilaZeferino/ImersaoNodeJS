const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

const failAction = (request, headers, erro) => {
  throw erro;
};

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: "/herois",
      method: "GET",
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
            nome: Joi.string().min(3).max(100),
          },
        },
      },
      handler: (request, headers) => {
        try {
          const { skip, limit, nome } = request.query;

          const query = nome ? { nome: { $regex: `.*${nome}*.` } } : {};

          return this.db.read(query, skip, limit);
        } catch (error) {
          return Boom.internal();
        }
      },
    };
  }

  create() {
    return {
      path: "/herois",
      method: "POST",
      config: {
        validate: {
          failAction: failAction,
          payload: {
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(2).max(100),
          },
        },
      },
      handler: async (request) => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });
          return {
            message: "Heroi cadastrado com sucesso!",
            _id: result._id,
          };
        } catch (error) {
          console.error("ERRO: ", error);
          return Boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: "/herois/{id}",
      method: "PATCH",
      config: {
        validate: {
          failAction: (request, h, err) => {
            throw err;
          },
          payload: {
            nome: Joi.string().max(100),
            poder: Joi.string().max(30),
          },
          params: {
            id: Joi.string().required(),
          },
        },
      },
      handler: async (request, headers) => {
        try {
          const payload = request.payload;
          const id = request.params.id;
          const dadosString = JSON.stringify(payload);
          const dados = JSON.parse(dadosString);
          const result = await this.db.update(id, dados);

          if (result.modifiedCount !== 1) return Boom.preconditionFailed('Id nao encontrado no banco')

          return {
            message: "Heroi atualizado com sucesso!",
          };
        } catch (error) {
          console.error("ERRO", error);
          return Boom.internal();
        }
      },
    };
  }

  delete() {
    return {
      path: "/herois/{id}",
      method: "DELETE",
      config: {
        validate: {
          failAction: failAction,
          params: {
            id: Joi.string().required(),
          },
        },
      },
      handler: async (request, headers) => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);

          if (result.deletedCount !== 1) return Boom.preconditionFailed('Id nao encontrado no banco')


          return {
            message: "Heroi removido com sucesso!",
          };
        } catch (error) {
          console.log("Error", error);
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = HeroRoutes;
