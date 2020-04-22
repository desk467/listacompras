import * as Express from 'express'
import * as JWT from 'jsonwebtoken'

export default async function AuthorizationMiddleware(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    try {
        const token = req.headers['authorization']?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                message: 'Token not provided'
            })
        }

        const authenticatedUser = await JWT.verify(token, process.env.SECRET)

        if (authenticatedUser) {
            req['userID'] = authenticatedUser.data.userID
            next()
        } else {
            return res.status(401).json({
                message: 'Unauthorized',
            })
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}