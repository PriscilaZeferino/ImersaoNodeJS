const {obterPessoas} = require('./service')

Array.prototype.meuReduce = function(callback, valorInicial){
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for(let index = 0; index <= this.length -1; index++ ) {
        valorFinal = callback(valorFinal, this[index], this);
    }
    return valorFinal;
}

async function main(){
    try {
        const {results} = await obterPessoas('a')
        // const pesos = results.map(item => parseInt(item.height))
        //[20.2, 30.3, 50.5] = valor]
        // console.log('pesos', pesos)
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior+proximo
        // },0) //acdicionar 0 caso o array esteja vazio
        const minhaLista = [
            ['Priscila', 'Yasmin'],
            ['Galaxia', 'Codigo']
        ]
        const total = minhaLista.meuReduce((anterior, proximo)=> {
            return anterior.concat(proximo)
        },[]).join(', ')
        console.log('Total', total)
    } catch (error) {
        console.error('ERRO', error)
    }
}

main()