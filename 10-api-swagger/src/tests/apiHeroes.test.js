const assert = require("assert");
const api = require("./../api");
let app = {};

const Joi = require("joi");

const MOCK_HEROI_CADASTRAR = {
  nome: "Chapolin Colorado",
  poder: "Super martelo",
};

let MOCK_ID = {};
const MOCK_HEROI_ATUALIZAR = {
  nome: "Batman",
};

function cadastrar() {
  return app.inject({
    method: "POST",
    url: "/herois",
    payload: {
      nome: "Flash",
      poder: "Velocidade",
    },
  });
}

describe("Suite de testes da API Heroes", function () {
  this.beforeAll(async () => {
    app = await api;
    const result = await cadastrar();
    MOCK_ID = JSON.parse(result.payload)._id;
  });

  it("listar /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois?skip=0&limit=10",
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it("listar /herois deve retornar somente 5 registros", async () => {
    const TAMANHO_LIMITE = 5;
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === TAMANHO_LIMITE);
  });

  it("listar /herois deve retornar erro interno se parametros invalidos", async () => {
    const TAMANHO_LIMITE = "AAA";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });
    const errorResult = {
      statusCode: 400,
      error: "Bad Request",
      message: 'child "limit" fails because ["limit" must be a number]',
      validation: { source: "query", keys: ["limit"] },
    };
    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(errorResult));
  });

  it("listar /herois deve filtrar um objeto pelo nome", async () => {
    const NOME = "Chapolin Colorado";
    const result = await app.inject({
      method: "GET",
      url: `/herois?nome=${NOME}`,
    });
    const [dados] = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.nome === NOME);
  });

  it("cadastrar POST /herois", async () => {
    const result = await app.inject({
      method: "POST",
      url: `/herois`,
      payload: MOCK_HEROI_CADASTRAR,
    });

    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Heroi cadastrado com sucesso!");
  });

  //ATUALIZAR

  it("não deve cadastrar com payload errado", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: {
        NAME: "Flash",
      },
    });
    const payload = JSON.parse(result.payload);
    assert.deepEqual(result.statusCode, 400);
    assert.ok(payload.message.search('"nome" is required') !== -1);
  });

  it("Atualizar PATCH /herois/{id}  deve atualizar com ID ", async () => {
    const expected = {
      nome: "Gavião Negro",
      poder: "Olhos de aguia",
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${MOCK_ID}`,
      payload: JSON.stringify(expected),
    });

    const statusCode = result.statusCode;
    assert.ok(statusCode, 200);

    const dados = JSON.parse(result.payload);
    assert.deepEqual(dados.message, "Heroi atualizado com sucesso!");
  });

  it("Atualizar PATCH /herois/{id} nao deve atualizar com ID incorreto!", async () => {
    const _id = `629a17e656f30ec7d15cd257`;
    const expected = {
      nome: "Gavião Negro",
      poder: "Olhos de aguia",
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected),
    });

    const statusCode = result.statusCode;
    assert.ok(statusCode, 412);

    const dados = JSON.parse(result.payload);
    assert.deepEqual(dados.message, "Id nao encontrado no banco");
  });

  it("Remover DELETE - /herois/:id deve remover o item", async () => {
    const _id = MOCK_ID;
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Heroi removido com sucesso!");
  });

  it("Remover DELETE - /herois/:id nao deve remover se o id nao foi encontrado", async () => {
    const _id = "629a17e656f30ec7d15cd257";
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
    });

    const expected = {
      error: "Precondition Failed",
      message: "Id nao encontrado no banco",
      statusCode: 412,
    };

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 412);
    assert.deepEqual(dados, expected);
  });

  it("Remover DELETE - /herois/:id nao deve remover com ID invalido", async () => {
    const _id = "asas";
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
    });

    const expected = {
      error: "Internal Server Error",
      message: "An internal server error occurred",
      statusCode: 500,
    };

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 500);
    assert.deepEqual(dados, expected);
  });
});
