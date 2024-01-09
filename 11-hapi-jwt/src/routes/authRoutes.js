const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

//npm i jsonwebtoken

const Jwt = require("jsonwebtoken");

const failAction = (request, headers, erro) => {
  throw erro;
};

const USER = {
  username: "lisa",
  password: "123",
};

class AuthRoutes extends BaseRoute {
  constructor(secret) {
    super();
    this.secret = secret;
  }
  login() {
    return {
      path: "/login",
      method: "POST",
      config: {
        tags: ["api"],
        description: "obter token",
        notes: "faz login com user e senha do banco de dados",
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
          },
        },
      },
      handler: async (request) => {
        const { username, password } = request.payload;

        if (
          username.toLowerCase() !== USER.username ||
          password !== USER.password
        ) {
          return Boom.unauthorized();
        }

        const token = Jwt.sign(
          {
            username: username,
            id: "",
          },
          this.secret
        );


        return {
          token
        };
      },
    };
  }
}

module.exports = AuthRoutes;
