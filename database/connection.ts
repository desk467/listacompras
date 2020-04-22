import { Sequelize } from 'sequelize'

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH,
})

connection.sync()

export default connection