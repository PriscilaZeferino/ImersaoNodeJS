/*
    0 - Obter usuário
    1 - Obter numero de telefone de um usuario a partir do seu Id
    2 - Obter o endereco do usuario pelo Id
*/

//importamos o modulo interno do nodejs

const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    //quando der algum problema -> reject
    //quando der tudo certo - > resolve
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Kate',
                dataNascimento: new Date()
            })
        }, 1000)
    })


}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromisse(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1178322323',
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua anamal',
            numero: 0
        })
    }, 2000)
}

const usuarioPromisse = obterUsuario();
//para manipular com sucesso, usamos o .then
//para manipular erros usamos o .cathc

usuarioPromisse
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result){
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function(resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    
    })
    .then(function (resultado) {
        console.log(`
        Nome: ${resultado.usuario.nome}, 
        Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero},
        Telefone: ${resultado.telefone.ddd} ${resultado.telefone.telefone}`)
        })
    .catch(function (error) {
        console.error('erro', 'deu ruim', error)
    })

    //usuario -> telefone -> telefone


// obterUsuario(function resolverUsuario(error, usuario) {
//     if(error) {
//         console.error('Deu ruim em usuario', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1) {
//             console.error('Deu ruim em telefone', error)
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
//             if(erro2) {
//                 console.error('Deu ruim em telefone', error)
//                 return;
//             }

//             console.log(`Nome: ${usuario.nome}, 
//                          Endereço: ${endereco.rua}, ${endereco.numero},
//                          Telefone: ${telefone.ddd} ${telefone.telefone}

//             `)
//         })
//     })

// })