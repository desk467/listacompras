import * as controllers from './controllers'

export default function registerRoutes(app) {
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
}