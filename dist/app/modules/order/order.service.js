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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const asyncForEach_1 = require("../../../helpers/asyncForEach");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Get: getOrders - get all orders for Admin and Customer who made the order 
const getAllOrders = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, process.env.JWT_SECRET);
    if (decodedToken.role === 'admin') {
        const result = yield prisma_1.default.order.findMany({
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    if (decodedToken.role === 'customer') {
        const result = yield prisma_1.default.order.findMany({
            where: { userId: decodedToken.userId },
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
});
// Get: get order by id - get order by id for specific customer and admin
const getOrderById = (token, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.order.findFirst({
        where: {
            id: orderId,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    const decodedToken = yield jwtHelpers_1.jwtHelpers.verifyToken(token, process.env.JWT_SECRET);
    if (decodedToken.role === 'admin') {
        const result = yield prisma_1.default.order.findMany({
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    if (decodedToken.role === 'customer') {
        const result = yield prisma_1.default.order.findMany({
            where: { id: orderId, userId: decodedToken.userId },
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
});
// Post: createOrder - create an order for a user
const createOrder = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, process.env.JWT_SECRET);
    const { orderedBooks } = payload;
    //   check if the user already has an order with same books in orderedBooks
    const userOrders = yield prisma_1.default.order.findMany({
        where: {
            userId: decodedToken.userId,
        },
        include: {
            orderedBooks: true,
        },
    });
    const userOrderWithSameBooks = userOrders.find((order) => {
        const orderedBooksIds = order.orderedBooks.map((orderedBook) => orderedBook.bookId);
        const payloadBooksIds = orderedBooks.map((orderedBook) => orderedBook.bookId);
        return orderedBooksIds.every((bookId) => payloadBooksIds.includes(bookId));
    });
    if (userOrderWithSameBooks) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You already have an order with same books");
    }
    const orderWithBooks = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield transactionClient.order.create({
            data: {
                userId: decodedToken.userId,
            },
            include: {
                orderedBooks: true,
            },
        });
        yield (0, asyncForEach_1.AsyncForEach)(orderedBooks, (book) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionClient.orderedBook.createMany({
                data: {
                    orderId: order.id,
                    bookId: book.bookId,
                    quantity: +book.quantity,
                },
            });
        }));
        return order;
    }));
    return orderWithBooks;
});
exports.OrderService = {
    getAllOrders,
    getOrderById,
    createOrder,
};
//# sourceMappingURL=order.service.js.map