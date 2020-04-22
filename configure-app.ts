import * as Express from 'express'
import registerRoutes from './routes'
import errorMiddleware from "@middlewares/error-middleware"

export default function configureApp(app) {
    app.use(Express.json())
    registerRoutes(app)

    app.use(errorMiddleware)

    return app
}
