import app from '../app'
import sequelize from '@database/connection'
import User from '@models/User'
import { v4 as generateUUID } from 'uuid'
import * as bcrypt from 'bcrypt'

import * as request from 'supertest'

describe('POST /login', () => {
    beforeAll(async () => {
        await sequelize.drop()
        await sequelize.sync({ force: true, })
        await User.create({
            uuid: generateUUID(),
            name: 'Usuario Cadastrado',
            username: 'usuario_cadastrado',
            password: await bcrypt.hash('123456', 10),
        })
    })

    it('Deve retornar um erro de validação caso não passe um `username`', (done) => {
        request(app)
            .post('/login')
            .expect(400)
            .end((err, res) => {
                expect(res.body.errors).toContainEqual({
                    msg: "Invalid value",
                    param: "username",
                    location: "body"
                })
                done()
            })
    })

    it('Deve retornar um erro de validação caso não passe um `password`', (done) => {
        request(app)
            .post('/login')
            .expect(400)
            .end((err, res) => {
                expect(res.body.errors).toContainEqual({
                    msg: "Invalid value",
                    param: "password",
                    location: "body"
                })
                done()
            })
    })

    it('Deve retornar um erro de validação caso seja passada uma `password` com menos de 6 caracteres', (done) => {
        request(app)
            .post('/login')
            .send({ password: 'cinco' })
            .expect(400)
            .end((err, res) => {
                expect(res.body.errors).toContainEqual({
                    msg: "Invalid value",
                    param: "password",
                    location: "body",
                    value: "cinco"
                })
                done()
            })
    })

    it('Deve retornar um erro caso seja passado um usuário não cadastrado', (done) => {
        request(app)
            .post('/login')
            .send({ username: 'teste', password: '123456' })
            .expect(400)
            .end((err, res) => {
                expect(res.body.message).toBe("User or Password are incorrect")
                done()
            })
    })

    it('Deve retornar um token caso seja passado um usuário cadastrado', (done) => {
        request(app)
            .post('/login')
            .send({ username: 'usuario_cadastrado', password: '123456' })
            .expect(200)
            .end((err, res) => {
                expect(res.body.token).toBeDefined()
                done()
            })
    })
})