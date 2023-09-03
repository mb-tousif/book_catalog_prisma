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
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllBooks = (queryPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search, minPrice, maxPrice, category, } = queryPayload;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const query = {
        where: {
            AND: [
                minPrice ? { price: { gte: parseFloat(minPrice.toString()) } } : {},
                maxPrice ? { price: { lte: parseFloat(maxPrice.toString()) } } : {},
                category ? { categoryId: category } : {},
                search
                    ? {
                        OR: [
                            {
                                title: { contains: search, mode: 'insensitive' },
                            },
                            {
                                author: {
                                    contains: search,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                genre: { contains: search, mode: 'insensitive' },
                            },
                        ],
                    }
                    : {},
            ],
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take,
    };
    const books = yield prisma_1.default.book.findMany({
        where: query.where,
        orderBy: query.orderBy,
        skip: query.skip,
        take: query.take,
        include: {
            category: true,
        },
    });
    if (books.length <= 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Books not found');
    }
    const total = yield prisma_1.default.book.count({
        where: query.where,
    });
    const totalPages = Math.ceil(total / Number(limit));
    return {
        meta: {
            page,
            limit,
            total,
            totalPages,
        },
        data: books,
    };
});
const getBookByCategoryId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findFirst({
        where: {
            categoryId: id,
        },
    });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book not found');
    }
    return book;
});
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book not found');
    }
    return book;
});
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.book.findFirst({
        where: {
            title: payload.title,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book already exist');
    }
    const book = yield prisma_1.default.book.create({
        data: payload,
        include: {
            category: true,
        },
    });
    return book;
});
const updateBookById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.book.findFirst({
        where: {
            title: payload.title,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book already exist');
    }
    const book = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return book;
});
const deleteBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.delete({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return book;
});
exports.BookService = {
    getAllBooks,
    getBookByCategoryId,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById,
};
//# sourceMappingURL=book.service.js.map