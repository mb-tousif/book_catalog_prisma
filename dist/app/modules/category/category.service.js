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
exports.CategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma_1.default.category.findMany({});
    if (categories.length <= 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Categories not found');
    }
    return categories;
});
const getCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma_1.default.category.findUnique({
        where: {
            id: categoryId
        },
        include: {
            books: true
        }
    });
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Category not found');
    }
    return category;
});
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.category.findFirst({
        where: {
            title: payload.title,
        },
    });
    if (isExist) {
        throw new Error('Category already exists');
    }
    const category = yield prisma_1.default.category.create({
        data: payload,
    });
    return category;
});
const updateCategoryById = (categoryId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // handle duplicate data in existing categories (title) in database
    const isExist = yield prisma_1.default.category.findFirst({
        where: {
            title: payload.title
        }
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Category already exists');
    }
    const category = yield prisma_1.default.category.update({
        where: {
            id: categoryId
        },
        data: payload
    });
    return category;
});
const deleteCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma_1.default.category.delete({
        where: {
            id: categoryId
        }
    });
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Category not found');
    }
    return category;
});
exports.CategoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
};
//# sourceMappingURL=category.service.js.map