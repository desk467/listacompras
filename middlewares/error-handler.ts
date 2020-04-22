import * as Express from 'express'

export default function ErrorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    console.log(err)

    res.status(500).json({ message: 'Something failed :/' })
}