require('dotenv').config()
require('module-alias/register')

import { app } from './app'
import configureApp from './configure-app'

configureApp(app)

console.log(`[WEBSERVICE] Webservice ativo na porta ${process.env.PORT}`)
app.listen(process.env.PORT)