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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield order_service_1.OrderService.getAllOrders(token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Orders fetched successfully",
        success: true,
        data: result,
    });
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const payload = req.params.id;
    const result = yield order_service_1.OrderService.getOrderById(token, payload);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Order not found");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Orders fetched successfully",
        success: true,
        data: result,
    });
}));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const payload = req.body;
    const result = yield order_service_1.OrderService.createOrder(token, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Order created successfully",
        success: true,
        data: result,
    });
}));
exports.OrderController = {
    getAllOrders,
    getOrderById,
    createOrder,
};
//# sourceMappingURL=order.controller.js.map