//npm install hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')

const heroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')

const app = new Hapi.Server({
    port: 5000
})

async function main() {

    const connection =  await MongoDB.connect();
    const context = new Context(new MongoDB(connection, heroiSchema))

    app.route([{
        path: '/herois',
        method: 'GET',
        handler: (req, head) => {
            return context.read()
        }
    }])

    await app.start()
    console.log("Server is running in the port ", app.info.port)
    return app
}

module.exports = main()