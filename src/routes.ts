import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductsController from './app/controllers/ProductsController';
import FileController from './app/controllers/FileController';

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

export default routes;
