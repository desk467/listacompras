import { Sequelize } from 'sequelize'

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db',
})

connection.sync()

export default connection