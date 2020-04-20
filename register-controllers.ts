import * as controllers from './controllers'

export default function registerControllers(app) {
    app.use('/user', controllers.authController.router)
    app.use('/shoplist', controllers.shopListController.router)
}