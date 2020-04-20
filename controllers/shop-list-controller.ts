import * as Express from 'express'

class ShopListController {
    readonly router: Express.Router

    constructor() {
        this.router = Express.Router()

        this.router.get('/', this.index)
        this.router.get('/:id', this.show)
        this.router.post('/new', this.new)
        this.router.put('/update', this.update)
        this.router.delete('/delete', this.delete)
    }

    async index(req: Express.Request, res: Express.Response) {

    }

    async show(req: Express.Request, res: Express.Response) {

    }

    async new(req: Express.Request, res: Express.Response) {

    }

    async update(req: Express.Request, res: Express.Response) {

    }

    async delete(req: Express.Request, res: Express.Response) {

    }
}

export default new ShopListController()