import { Request, Response } from 'express';
import Product from '../models/Product';

class StockController {
  async index(req: Request, res: Response) {
    const productExist = await Product.findByPk(req.params.productId);

    if (!productExist) {
      return res.status(400).json({
        error: 'This product does not exist.',
      });
    }

    const products = await Product.findOne({
      attributes: ['id', 'amount'],
      where: { id: req.params.productId },
    });
    return res.json(products);
  }
}

export default new StockController();
