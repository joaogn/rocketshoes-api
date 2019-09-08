import { Request, Response } from 'express';
import Product from '../models/Product';
import File from '../models/File';

class DetailController {
  async index(req: Request, res: Response) {
    const productExist = await Product.findByPk(req.params.productId);

    if (!productExist) {
      return res.status(400).json({
        error: 'This product does not exist.',
      });
    }

    const products = await Product.findOne({
      attributes: ['id', 'title', 'price', 'amount', 'image'],
      where: { id: req.params.productId },
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['url', 'path'],
        },
      ],
    });
    return res.json(products);
  }
}

export default new DetailController();
