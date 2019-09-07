import { Request, Response } from 'express';

class ProductsController {
  async index(req: Request, res: Response) {
    return res.json({ message: 'Hello World' });
  }
}

export default new ProductsController();
