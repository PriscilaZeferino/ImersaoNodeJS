//npm install --save-dev mocha

const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'Flechas'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Mulher maravilha',
    poder: 'Flechas'
}

const ATUALIZADO = {}

describe('Postgres Strategy', function() {
    this.timeout(Infinity)

    this.beforeAll(async function() {
        db = await context.connect()
        await context.delete();
        await context.create(MOCK_HEROI_CADASTRAR);
        await context.create(MOCK_HEROI_ATUALIZAR);
    })
    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async function () {
        const [result] = await context.read(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('atualizar', async function () {
        const [itemAtualizar] = await context.read({});
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Batman'
        }

        const [update] = await context.update(itemAtualizar.id, novoItem);
        assert.deepEqual(update, 1)
    })

    // it('Verificar se o item foi de fato atualizado', async function () {
    //     const novoItem = {
    //         ...MOCK_HEROI_ATUALIZAR,
    //         nome: 'Batman',
    //     }
    //     console.log(novoItem)
    //     const [itemAtualizado] = await context.read({})
    //     assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    // })

    it('remover', async function () {
        const [item] = await context.read({});
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})
