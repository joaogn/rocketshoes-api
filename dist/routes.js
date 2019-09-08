"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const ProductsController_1 = __importDefault(require("./app/controllers/ProductsController"));
const FileController_1 = __importDefault(require("./app/controllers/FileController"));
const ProductsValidation_1 = require("./app/middlewares/ProductsValidation");
const routes = express_1.Router();
const upload = multer_1.default(multer_2.default);
routes.post('/files', upload.single('file'), FileController_1.default.store);
routes.get('/products', ProductsController_1.default.index);
routes.post('/products', ProductsValidation_1.ProductStoreValidation, ProductsController_1.default.store);
routes.put('/products/:productId', ProductsValidation_1.ProductUpdateValidation, ProductsController_1.default.update);
routes.delete('/products/:productId', ProductsController_1.default.delete);
exports.default = routes;
//# sourceMappingURL=routes.js.map