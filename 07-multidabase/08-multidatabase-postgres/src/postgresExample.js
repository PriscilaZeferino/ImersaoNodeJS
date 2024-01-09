//ORM
//npm install sequelize

//DRIVE
//npm install pg-hstore pg

const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'priscilayrz',
    'senha',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
        
    }
)

async function main() {
    const Herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncremente: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true,
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })

    await Herois.sync()

    // await Herois.create({
    //     nome: 'Lanterna Verde',
    //     poder: 'Anel'
    // })

    const result = await Herois.findAll({
        raw: true
    })

    console.log('result', result)
}

main()
