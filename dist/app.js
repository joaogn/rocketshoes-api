"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
class App {
    constructor() {
        this.server = express_1.default();
        this.middlerware();
        this.routes();
    }
    middlerware() {
        this.server.use(express_1.default.json());
        this.server.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp', 'uploads')));
    }
    routes() {
        this.server.use(routes_1.default);
    }
}
exports.default = new App().server;
//# sourceMappingURL=app.js.map