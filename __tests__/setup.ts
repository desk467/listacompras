/**
 * Script para configurar o .env que esta disponível na pasta __tests__
 */

const path = require('path')

require('dotenv').config({
    path: path.resolve(__dirname + '/.env')
})