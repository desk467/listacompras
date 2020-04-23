import * as Express from "express";
import registerRoutes from './routes'
import errorMiddleware from "@middlewares/error-middleware"

const app = Express()

app.use(Express.json())
registerRoutes(app)

app.use(errorMiddleware)

export default app