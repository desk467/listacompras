import * as Express from 'express'
import * as controllers from './controllers'

import AuthorizationMiddleware from '@middlewares/authorization-middleware'

export default function registerRoutes(app: Express.Application) {
    // User
    app.post(
        '/login',
        controllers.sessionController.validationNewSessionRules(),
        controllers.sessionController.new
    )
    app.post(
        '/signup',
        controllers.userController.validateNewUserRules(),
        controllers.userController.new,
    )

    // Rotas de autenticação devem ser adicionadas logo abaixo
    app.use(AuthorizationMiddleware)

    // ShopList

    app.get(
        '/shoplist',
        controllers.shopListController.index,
    )
}