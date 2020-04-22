require('dotenv').config()
import 'module-alias/register'

import * as Express from 'express'
import { app } from './app'
import registerRoutes from './routes'

import errorHandler from "@middlewares/error-handler"

app.use(Express.json())
registerRoutes(app)

app.use(errorHandler)

console.log(`[WEBSERVICE] Webservice ativo na porta ${process.env.PORT}`)
app.listen(process.env.PORT)