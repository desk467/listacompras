import { app } from '../app'
import configureApp from '../configure-app'
import * as request from 'supertest'

describe('POST /login', function () {
    it('Deve retornar um erro de validação caso não passe um `username`', function (done) {
        request(configureApp(app))
            .post('/login')
            .expect(400, done)
    })
})