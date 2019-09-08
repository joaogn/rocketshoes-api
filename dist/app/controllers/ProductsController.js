"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Product_1 = __importDefault(require("../models/Product"));
const File_1 = __importDefault(require("../models/File"));
class ProductsController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const existProduct = yield Product_1.default.findOne({ where: { title } });
            if (existProduct) {
                return res.status(400).json({
                    error: 'there is already a product with this title',
                });
            }
            const product = yield Product_1.default.create(req.body);
            return res.json(product);
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Product_1.default.findAll({
                attributes: ['id', 'title', 'price', 'amount', 'image'],
                include: [
                    {
                        model: File_1.default,
                        as: 'file',
                        attributes: ['url', 'path'],
                    },
                ],
            });
            return res.json(products);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const productExist = yield Product_1.default.findByPk(req.params.productId);
            if (!productExist) {
                return res.status(400).json({
                    error: 'This product does not exist.',
                });
            }
            const existName = yield Product_1.default.findOne({
                where: {
                    title,
                    id: { [sequelize_1.Op.ne]: req.params.productId },
                },
            });
            if (existName) {
                return res.status(400).json({
                    error: 'there is already a product with this title',
                });
            }
            const product = yield Product_1.default.update(req.body, {
                where: { id: req.params.productId },
            });
            console.log('aqui 2');
            return res.json(product);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send();
        });
    }
}
exports.default = new ProductsController();
//# sourceMappingURL=ProductsController.js.map