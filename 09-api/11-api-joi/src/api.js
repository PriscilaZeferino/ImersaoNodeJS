//npm install hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')

const heroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const HeroRoute = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}


async function main() {

    const connection =  await MongoDB.connect();
    const context = await new Context(new MongoDB(connection, heroiSchema))

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start()
    console.log("Server is running in the port ", app.info.port)
    return app
}

module.exports = main()