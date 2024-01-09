const assert = require('assert');
const api = require('./../api');
let app = {}

describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api;
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('listar /herois deve retornar somente 5 registros', async () => {
        const TAMANHO_LIMITE = 5;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('listar /herois deve retornar erro interno se parametros invalidos', async () => {
        const TAMANHO_LIMITE = "AAA";
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        assert.deepEqual(result.payload, 'Erro interno do servidor')
    })


    it('listar /herois deve filtrar um objeto pelo nome', async () => {
        const NOME = "Mulher Maravilha 1654087150320"
        const result = await app.inject({
            method: 'GET',
            url: `/herois?nome=${NOME}`
        })
        const [dados] = JSON.parse(result.payload)
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.nome === NOME)

    })


})