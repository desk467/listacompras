import app from '../app'
import * as request from 'supertest'

describe('POST /login', function () {
    it('Deve retornar um erro de validação caso não passe um `username`', function (done) {
        request(app)
            .post('/login')
            .expect(400, done)
    })
})