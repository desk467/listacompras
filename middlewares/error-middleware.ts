import * as Express from 'express'
import logger from '../logger'

export default function ErrorMiddleware(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    logger.error({
        error: err,
        stack: err.stack,
    })

    res.status(500).json({ message: 'Something failed :/' })
}