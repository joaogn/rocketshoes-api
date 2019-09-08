import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductsController from './app/controllers/ProductsController';
import FileController from './app/controllers/FileController';
import StockController from './app/controllers/StockController';
import DetailController from './app/controllers/DetailController';

import {
  ProductStoreValidation,
  ProductUpdateValidation,
} from './app/middlewares/ProductsValidation';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/products', ProductsController.index);
routes.post('/products', ProductStoreValidation, ProductsController.store);
routes.put(
  '/products/:productId',
  ProductUpdateValidation,
  ProductsController.update
);
routes.delete('/products/:productId', ProductsController.delete);

routes.get('/products/:productId', DetailController.index);

routes.get('/stock/:productId', StockController.index);

export default routes;
