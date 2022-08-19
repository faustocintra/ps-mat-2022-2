const {Sequelize} = require('sequelize') //chamando/importando o sequelize

async function connect (){

const sequelize = new Sequelize(
    process.env.APP_DB_NAME,
    process.env.APP_DB_USER, 
    process.env.APP_DB_PASS,
    {
        host: process.env.APP_DB_HOST,
        dialect: 'mysql'
    }
  );

  //testando conexão
  try {
    //sincroniza a aplicação com o banco de dados
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); //encerra o servidor
}

}

module.exports = connect()