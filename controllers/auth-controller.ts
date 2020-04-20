import * as Express from 'express'
import { check, validationResult } from 'express-validator'
import * as JWT from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { v4 as generateUUID } from 'uuid'

import User from '../models/User'

interface LoginRequest {
    username: string
    password: string
}

interface SignupRequest {
    name: string
    username: string
    password: string
}

class AuthController {
    readonly router: Express.Router

    constructor() {
        this.router = Express.Router()

        this.router.post('/login', this.validationLoginRules(), this.login)
        this.router.post('/signup', this.validateSignup(), this.signup)
    }

    validationLoginRules() {
        return [
            check('username').isString(),
            check('password').isLength({ min: 6 }),
        ]
    }

    async login(req: Express.Request<any, any, LoginRequest>, res: Express.Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const user = await User.findOne({ where: { username: req.body.username } })

        if (user) {
            const passwordsMatch = await bcrypt.compare(req.body.password, user.password)

            if (passwordsMatch) {
                const expirationDate = Math.floor(Date.now() / 1000) + (60 * 60) // Expires in 1 hour

                return res.json({
                    message: 'Successful Login',
                    token: JWT.sign({ data: { userID: user.id }, exp: expirationDate }, process.env.SECRET)
                })
            }
        }

        return res.status(400).json({
            message: 'User or Password are incorrect'
        })
    }

    validateSignup() {
        return [
            check('name').isString(),
            check('username').isString(),
            check('password').isLength({ min: 6 })
        ]
    }

    async signup(req: Express.Request<any, any, SignupRequest>, res: Express.Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, username, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            uuid: generateUUID(),
            name,
            username,
            password: hashedPassword,
        })

        return res.status(201).json({
            message: 'User created',
            user: {
                id: user.uuid,
                name: user.name,
                username: user.username,
                createdAt: user.createdAt,
            },
        })

    }
}

export default new AuthController()