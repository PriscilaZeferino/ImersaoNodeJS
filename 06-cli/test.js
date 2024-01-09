const {deepEqual, ok} = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna verde',
    poder: 'Energia do anel',
    id: 2
}

const db = require('./database')

//OK - so diz se veio o objeto ou nao
//DeepEqual - verifica se ele é completamente igual ao objeto esperado

describe('Suite de manipulação de Heroes', () => {

    before(async () => {
        await db.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await db.cadastrar(DEFAULT_ITEM_ATUALIZAR)

    })

    it('deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await db.listar(expected.id)
        deepEqual(resultado, expected)
    })


    it('deve cadastrar um herói, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await db.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await db.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expected)
    })

    it('deve remover um heroi pelo id, usando arquivos', async () => {
        const expected = true
        const resultado = await db.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it('deve atualizar um heroi', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        await db.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await db.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })
})
