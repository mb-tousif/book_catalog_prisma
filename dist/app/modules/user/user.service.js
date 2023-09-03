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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hashPassword_1 = require("../../../helpers/hashPassword");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Get all users service
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    //   handle [] for users data
    if (!users) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Users not found');
    }
    return users;
});
// Get user by id service
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return user;
});
const updateUserById = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  handle duplicate user data in existing user table by email
    console.log(payload);
    if (payload.email && payload.email.length > 0) {
        const isExist = yield prisma_1.default.user.findFirst({
            where: {
                email: payload.email,
            },
        });
        if (isExist) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'New data may be duplicate with existing user data');
        }
    }
    // handle update password with hash
    if (payload.password && payload.password.length > 0) {
        payload.password = yield hashPassword_1.hashPasswordHelper.hashPassword(payload.password);
    }
    const user = prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: payload,
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return user;
});
// Define user by id
const deleteUserById = (userId) => {
    const user = prisma_1.default.user.delete({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return user;
};
exports.userService = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
//# sourceMappingURL=user.service.js.map