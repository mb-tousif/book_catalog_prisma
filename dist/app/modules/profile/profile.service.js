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
exports.ProfileService = void 0;
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Get: Profile - get user profile by header token for specific user(admin, customer)
const getProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = yield jwtHelpers_1.jwtHelpers.verifyToken(token, process.env.JWT_SECRET);
    if ((decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role) === 'admin' || (decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role) === 'customer') {
        const result = yield prisma_1.default.user.findUnique({
            where: { id: decodedToken.userId },
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
        return result;
    }
});
exports.ProfileService = {
    getProfile,
};
//# sourceMappingURL=profile.service.js.map