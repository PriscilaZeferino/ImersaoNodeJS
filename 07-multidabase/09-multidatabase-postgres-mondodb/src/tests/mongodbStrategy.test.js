const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'Flechas'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Mulher Maravilha ${Date.now()}`,
    poder: 'Laço'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino ${Date.now()}`,
    poder: 'Velocidade'
}

let MOCK_HEROI_ID = ''

describe.only('MongoDB Suite Tests', function () {

    this.beforeAll(async function() {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })

    it('Verificar conexão', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })

    it('cadastrar', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () => {
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        const result = {nome, poder}
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('update', async () => {
        const result = await context.update(MOCK_HEROI_ID, {nome: 'Pernalonga'})
        assert.deepEqual(result.modifiedCount, 1)
    })

    it('delete', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result.deletedCount, 1)
    })
})