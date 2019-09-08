import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/Product';
import File from '../models/File';

interface ProductType {
  title: string;
  price: number;
  amount: number;
  image_id: number;
}

class ProductsController {
  async store(req: Request, res: Response) {
    const { title }: ProductType = req.body;
    const existProduct = await Product.findOne({ where: { title } });

    if (existProduct) {
      return res.status(400).json({
        error: 'there is already a product with this title',
      });
    }

    const product = await Product.create(req.body);
    return res.json(product);
  }

  async index(req: Request, res: Response) {
    const products = await Product.findAll({
      attributes: ['id', 'title', 'price', 'amount', 'image'],
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

  async update(req: Request, res: Response) {
    const { title }: ProductType = req.body;
    const productExist = await Product.findByPk(req.params.productId);

    if (!productExist) {
      return res.status(400).json({
        error: 'This product does not exist.',
      });
    }

    const existName = await Product.findOne({
      where: {
        title,
        id: { [Op.ne]: req.params.productId },
      },
    });

    if (existName) {
      return res.status(400).json({
        error: 'there is already a product with this title',
      });
    }

    await Product.update(req.body, {
      where: { id: req.params.productId },
    });

    return res.json(await Product.findByPk(req.params.productId));
  }

  async delete(req: Request, res: Response) {
    const productExist = await Product.findByPk(req.params.productId);

    if (!productExist) {
      return res.status(400).json({
        error: 'This product does not exist.',
      });
    }

    await Product.destroy({ where: { id: req.params.productId } });

    return res.send();
  }
}

export default new ProductsController();
