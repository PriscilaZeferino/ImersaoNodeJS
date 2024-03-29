//npm install hapi
//npm install vision inert hapi-swagger
const Hapi = require("hapi");
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");

const heroiSchema = require("./db/strategies/mongodb/schemas/heroiSchema");
const HeroRoute = require("./routes/heroRoutes");
const AuthRoute = require("./routes/authRoutes");

const HapiSwagger = require("hapi-swagger");
const Vision = require("vision");
const hapiSwagger = require("hapi-swagger");
const Inert = require("inert");

const JWT_SECRET = "MEU SEGREDO"

const app = new Hapi.Server({
  port: 5000,
});

function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = await MongoDB.connect();
  const context = await new Context(new MongoDB(connection, heroiSchema));

  const swaggerOptions = {
    info: {
      title: "API Herois",
      version: "v1.0",
    },
    lang: "pt",
  };

  await app.register([
    Vision,
    Inert,
    {
      plugin: hapiSwagger,
      options: swaggerOptions,
    },
  ]);

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
  ]);

  await app.start();
  console.log("Server is running in the port ", app.info.port);
  return app;
}

module.exports = main();

//np
