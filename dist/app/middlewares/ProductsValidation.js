"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
exports.ProductStoreValidation = (req, res, next) => {
    const schema = Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        price: Yup.number().required('Price is Required'),
        amount: Yup.number().required('Amount is Required'),
        image_id: Yup.number().required('Image_id is Required'),
    });
    schema
        .validate(req.body)
        .then(() => {
        next();
    })
        .catch(err => {
        res.status(400).json({ error: err.message });
    });
};
exports.ProductUpdateValidation = (req, res, next) => {
    const schema = Yup.object().shape({
        title: Yup.string(),
        price: Yup.number(),
        amount: Yup.number(),
        image_id: Yup.number(),
    });
    schema
        .validate(req.body)
        .then(() => {
        next();
    })
        .catch(err => {
        res.status(400).json({ error: err.message });
    });
};
//# sourceMappingURL=ProductsValidation.js.map