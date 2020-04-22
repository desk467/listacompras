import * as Express from 'express'
import { check, validationResult } from 'express-validator'
import * as JWT from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import User from '@models/User'

interface NewSessionRequest {
    username: string
    password: string
}

class SessionController {
    validationNewSessionRules() {
        return [
            check('username').isString(),
            check('password').isLength({ min: 6 }),
        ]
    }

    async new(req: Express.Request<any, any, NewSessionRequest>, res: Express.Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const user = await User.findOne({ where: { username: req.body.username } })

        if (user) {
            const passwordsMatch = await bcrypt.compare(req.body.password, user.password)

            if (passwordsMatch) {
                return res.json({
                    message: 'Successful Login',
                    token: JWT.sign({ data: { userID: user.uuid } }, process.env.SECRET, { expiresIn: '1h' })
                })
            }
        }

        return res.status(400).json({
            message: 'User or Password are incorrect'
        })
    }
}

export default new SessionController()