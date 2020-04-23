require('dotenv').config()
require('module-alias/register')

import app from './app'
import logger from './logger'

logger.info(`Webservice ativo na porta ${process.env.PORT}`)
app.listen(process.env.PORT)