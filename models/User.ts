import * as Sequelize from 'sequelize'
import connection from './connection'

class User extends Sequelize.Model {
    uuid: string
    name: string
    password: string
}

User.init({
    uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    sequelize: connection,
    modelName: 't_user',
})

export default User