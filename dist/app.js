"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: '*' }));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1', routes_1.default);
//global error handler
app.use(globalErrorHandler_1.default);
app.get('/', (req, res) => {
    res.send(`<h3 style='text-align: center; padding: 20px; color:green'>🐱‍🏍 Welcome to ${config_1.default.app_name} API 🐱‍🏍</h3>`);
});
//handle not found
app.all('*', (req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: `🚦 Requested ${req.originalUrl} this Route Not Found 💥`,
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map