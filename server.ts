require('dotenv').config()
import 'module-alias/register'

import * as Express from 'express'
import { app } from './app'
import registerRoutes from './routes'

import errorMiddleware from "@middlewares/error-middleware"

app.use(Express.json())
registerRoutes(app)

app.use(errorMiddleware)

console.log(`[WEBSERVICE] Webservice ativo na porta ${process.env.PORT}`)
app.listen(process.env.PORT)