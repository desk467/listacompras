import * as Express from 'express'

class ShopListController {
    async index(req: Express.Request, res: Express.Response) {
        return res.json([])
    }
}

export default new ShopListController()