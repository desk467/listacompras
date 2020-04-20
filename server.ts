require('dotenv').config()

import { app } from './app'
import registerControllers from './register-controllers'

registerControllers(app)

console.log(`[WEBSERVICE] Webservice ativo na porta ${process.env.PORT}`)
app.listen(process.env.PORT)