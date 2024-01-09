/*
    0 - Obter usuário
    1 - Obter numero de telefone de um usuario a partir do seu Id
    2 - Obter o endereco do usuario pelo Id
*/

function obterUsuario(callback) {
    setTimeout(function() {
        return callback(null, {
            id: 1,
            nome: 'Kate',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(()=> {
        return callback(null, {
            telefone: '1178322323',
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(()=> {
        return callback(null, {
            rua: 'Rua anamal',
            numero: 0
        })
    }, 2000)
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
    if(error) {
        console.error('Deu ruim em usuario', error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error('Deu ruim em telefone', error)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
            if(erro2) {
                console.error('Deu ruim em telefone', error)
                return;
            }

            console.log(`Nome: ${usuario.nome}, 
                         Endereço: ${endereco.rua}, ${endereco.numero},
                         Telefone: ${telefone.ddd} ${telefone.telefone}

            `)
        })
    })

})