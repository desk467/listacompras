import * as Express from 'express'

class AuthController {
    readonly router: Express.Router

    constructor() {
        this.router = Express.Router()

        this.router.post('/login', this.login)
        this.router.post('/signup', this.signup)
    }

    async login(req: Express.Request, res: Express.Response) {

    }

    async signup(req: Express.Request, res: Express.Response) {

    }
}

export default new AuthController()