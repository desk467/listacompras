import * as Sequelize from 'sequelize'
import connection from '@database/connection'

class User extends Sequelize.Model { }

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
        unique: true,
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