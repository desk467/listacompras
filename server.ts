require('dotenv').config()

import * as Express from 'express'
import { app } from './app'
import registerControllers from './register-controllers'

app.use(Express.json())
registerControllers(app)

console.log(`[WEBSERVICE] Webservice ativo na porta ${process.env.PORT}`)
app.listen(process.env.PORT)