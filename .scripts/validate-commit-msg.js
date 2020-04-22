#!/usr/bin/env node
const fs = require('fs')

const file = fs.readFileSync(process.env.HUSKY_GIT_PARAMS)
const message = file.toString('utf-8')

if (message.length > 70) {
    console.log("Erro: A mensagem do commit deve possuir no máximo 70 caracteres.")
    process.exit(1)
}

const types = ["chore", "fix", "feat", "docs"]

let contains_type = false
for (let type of types) {
    if (message.includes(`${type}: `)) {
        contains_type = true
        break
    }
}

if (!contains_type) {
    console.log("Erro: A mensagem do commit deve possuir um dos tipos a seguir: ")
    console.log(types)

    process.exit(1)
}
