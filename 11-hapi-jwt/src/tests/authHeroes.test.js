const assert = require('assert')
const api = require('../api')

let app = {}

describe.only('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api;
    })

    it('deve obter um token', async ()=> {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: "lisa",
                password: "123",
            }
        })

        console.log(result.payload)
        const statusCode =  result.statusCode;
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })  
})