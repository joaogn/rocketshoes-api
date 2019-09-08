import Sequelize, { Model } from 'sequelize';
import sequelize from '../../database';
import File from './File';

class Product extends Model {
  public id!: number;

  public title!: string;

  public price!: number;

  public amount!: number;

  public image_id!: number;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;
}

Product.init(
  {
    title: Sequelize.STRING,
    price: Sequelize.INTEGER,
    amount: Sequelize.INTEGER,
    image: Sequelize.VIRTUAL,
  },
  {
    tableName: 'products',
    sequelize, // this bit is important
  }
);

Product.addHook('afterFind', async (products: any) => {
  if (Array.isArray(products)) {
    products.forEach(product => {
      product.image = product.file.url;
    });
  }
});

Product.belongsTo(File, { foreignKey: 'image_id', as: 'file' });

export default Product;
