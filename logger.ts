import * as winston from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            level: 'info',
        }),
        new winston.transports.File({
            filename: 'errors.log',
            level: 'error',
        })
    ]
})

export default logger