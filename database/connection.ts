import { Sequelize } from 'sequelize'

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH,
    logging: false,
})

connection.sync()

export default connection