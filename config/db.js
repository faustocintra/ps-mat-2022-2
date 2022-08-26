const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.APP_DB_NAME, 
    process.env.APP_DB_USER, 
    process.env.APP_DB_PASS, 
    {
        host: process.env.APP_DB_HOST,
        dialect: 'mysql'
    }
)

try {
    sequelize.authenticate() 
    console.log('Connection has been established successfully.')
} 
catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)     // Encerra o servidor
}

module.exports = sequelize

/* async function connect() {

    const sequelize = new Sequelize(
        process.env.APP_DB_NAME, 
        process.env.APP_DB_USER, 
        process.env.APP_DB_PASS, 
        {
            host: process.env.APP_DB_HOST,
            dialect: 'mysql'
        }
    )

    try {
        await sequelize.authenticate() 
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        process.exit(1)     // Encerra o servidor
    }

    return sequelize

}*/


// const { Sequelize } = require('sequelize');

// async function connect() {

// const sequelize = new Sequelize(
//     process.env.APP_DB_NAME,
//     process.env.APP_DB_USER,
//     process.env.APP_DB_PASS,
//     {
//     host: process.env.APP_DB_HOST,
//     dialect: 'mysql'
//     }
// );


//   try {
//     //sincroniza a aplicação com o DB
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');

//     return sequelize

//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     process.exit(1) // Encerra o servidor
//   }

// }


// module.exports = connect();