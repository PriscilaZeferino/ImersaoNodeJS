const {obterPessoas} = require('./service')

/*
    const item = {
        nome: 'Priscila',
        idade: 21
    }

    const {nome, idade} = item
    console.log(nome, idade)

    //TECNICA CHAMADA DESTRUCTING
*/

Array.prototype.meuFilter = function (callback) {
    const lista = []
    for(index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        //0, "", null, ou indefined vai ser falso
        if(!result) continue;
        lista.push(item)
    }
    return lista
}

async function main() {
    try {
        const {results} = await obterPessoas('a')

        // const familiaLars = results.filter(function(item){
        //     //por padrao precisa retorna um booleano para informa se 
        //     //deve manter ou remover da lista
        //     //false = remove da lista
        //     //true = mantem

        //     const result = item.name.toLowerCase().indexOf(`lars`)!==-1
        //     return result;
        // })

        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`Index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familiaLars.map(pessoa=>pessoa.name)
        console.log(names)

    }catch {
        console.error("erro", error)
    }
}

main()