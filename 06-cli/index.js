const {Command} = require('commander');
const db = require("./database");

const Heroi = require('./heroi')

async function main() {

    const program = new Command()

  program
    .version('v1')
    .option('-n, --nome [value]', 'Nome do heroi')
    .option('-p, --poder [value]', 'Poder do heroi')
    .option('-i, --id [value]', 'Id do heroi')

    .option('-c, --cadastrar', 'Cadastrar novo heroi')
    .option('-l, --listar', 'Listar todos os heroi')
    .option('-b, --buscar', 'Listar um heroi')
    .option('-u, --atualizar [value]', 'Atualizar um heroi')
    .option('-r, --remover', 'Remove um heroi pelo id')

    program.parse(process.argv);

    const options = program.opts();

    const heroi = new Heroi(options)
    try {
        if(options.cadastrar) {
            delete heroi.id
            const resultado = await db.cadastrar(heroi)
            if(!resultado) {
                console.error('Heroi nao foi cadastrado')
                return;
            }

            console.log('Heroi cadastrado com sucesso')
        }
    
        if(options.listar) {
            const resultado = await db.listar()
            if(!resultado) {
                console.error('Heroi nao foi encontrado')
                return;
            }

            console.log('\n Lista de herois')
            console.log(resultado)

        }

        if(options.remover) {
            const resultado = await db.remover(heroi.id)
            if(!resultado) {
                console.error('Nao foi possível remover o heroi')
            }

            console.log('Heroi removido com sucesso')
        }

        if(options.atualizar) {
            const idAtualizar = parseInt(options.atualizar);
            delete heroi.id;
            //remover todas as chaves undefined
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await db.atualizar(idAtualizar, heroiAtualizar)

            if(!resultado) {
                console.error('Nao foi possivel atualizar heroi')
                return;
            }

            console.log("Heroi atualizado com sucesso");

        }

        // if(options.listar) {
        //     const resultado = await db.listar()
        //     if(!resultado) {
        //         console.error('Heroi nao foi encontrado')
        //         return;
        //     }

        //     console.log('\n Lista de herois')
        //     console.log(resultado)

        // }

        // if(options.buscar) {
        //     const resultado = await db.listar(heroi)
        //     if(!resultado) {
        //         console.error('Heroi nao foi encontrado')
        //         return;
        //     }


        //     console.log('\n Lista de herois')
        //     console.log(resultado)        
        // }

    }
    catch(error) {
        console.error("ERRO", error)
    }

}

main()