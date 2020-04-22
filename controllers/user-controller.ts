import * as Express from 'express'
import { check, validationResult } from 'express-validator'
import { v4 as generateUUID } from 'uuid'
import User from '@models/User'
import * as bcrypt from 'bcrypt'


interface NewUserRequest {
    name: string
    username: string
    password: string
}

class UserController {
    validateNewUserRules() {
        return [
            check('name').isString(),
            check('username').isString(),
            check('password').isLength({ min: 6 })
        ]
    }

    async new(req: Express.Request<any, any, NewUserRequest>, res: Express.Response, next: Express.NextFunction) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, username, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        try {
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

        } catch (err) {
            if (err.name == 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    message: 'User with this username already exists. Please pick another one',
                    username: req.body.username,
                })
            }

            next(err)
        }
    }
}

export default new UserController