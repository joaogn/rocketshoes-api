"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const v4_1 = __importDefault(require("uuid/v4"));
const path_1 = require("path");
exports.default = {
    storage: multer_1.default.diskStorage({
        destination: path_1.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => cb(null, v4_1.default() + path_1.extname(file.originalname)),
    }),
};
//# sourceMappingURL=multer.js.map