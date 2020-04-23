import app from '../app'
import sequelize from '@database/connection'
import User from '@models/User'
import { v4 as generateUUID } from 'uuid'
import * as bcrypt from 'bcrypt'

import * as request from 'supertest'

describe('POST /signup', () => {
    beforeAll(async () => {
        await sequelize.drop()
        await sequelize.sync({ force: true, })
        await User.create({
            uuid: generateUUID(),
            name: 'Usuario Já Cadastrado',
            username: 'usuario_ja_cadastrado',
            password: await bcrypt.hash('123456', 10),
        })
    })

    it('Deve retornar um erro de validação caso não passe um dos campos', (done) => {
        request(app)
            .post('/signup')
            .expect(400)
            .end((err, res) => {
                for (let campo of ["name", "username", "password"]) {
                    expect(res.body.errors).toContainEqual({
                        msg: "Invalid value",
                        param: campo,
                        location: "body"
                    })
                }
                done()
            })
    })

    it('Deve retornar um erro de validação caso o campo de senha tenha menos de 6 caracteres', (done) => {
        request(app)
            .post('/signup')
            .send({ password: "cinco" })
            .expect(400)
            .end((err, res) => {
                expect(res.body.errors).toContainEqual({
                    msg: "Invalid value",
                    param: "password",
                    value: "cinco",
                    location: "body"
                })
                done()
            })
    })

    it('Deve retornar um erro de validação caso o usuário já esteja cadastrado', (done) => {
        request(app)
            .post('/signup')
            .send({
                name: "Mais um usuário já cadastrado",
                username: "usuario_ja_cadastrado",
                password: '123456'
            })
            .expect(400)
            .end((err, res) => {
                expect(res.body.message)
                    .toBe("User with this username already exists. Please pick another one")
                done()
            })
    })

    it('Deve retornar OK caso tente cadastrar um usuário ainda não cadastrado, com todos os campos', (done) => {
        request(app)
            .post('/signup')
            .send({
                name: "Um novo usuário que irá se cadastrar",
                username: "novo_usuario",
                password: '123456'
            })
            .expect(200)
            .end((err, res) => {
                expect(res.body.user).toBeDefined()
                done()
            })
    })
})