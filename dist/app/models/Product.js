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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = __importDefault(require("../../database"));
const File_1 = __importDefault(require("./File"));
class Product extends sequelize_1.Model {
}
Product.init({
    title: sequelize_1.default.STRING,
    price: sequelize_1.default.INTEGER,
    amount: sequelize_1.default.INTEGER,
    image: sequelize_1.default.VIRTUAL,
}, {
    tableName: 'products',
    sequelize: database_1.default,
});
Product.addHook('afterFind', (product) => __awaiter(void 0, void 0, void 0, function* () {
    if (product.file.url) {
        product.image = product.file.url;
    }
}));
Product.belongsTo(File_1.default, { foreignKey: 'image_id', as: 'file' });
exports.default = Product;
//# sourceMappingURL=Product.js.map