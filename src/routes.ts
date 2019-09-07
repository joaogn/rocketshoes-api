import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductsController from './app/controllers/ProductsController';
import FileController from './app/controllers/FileController';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/', ProductsController.index);

export default routes;
