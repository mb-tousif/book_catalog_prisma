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
exports.AsyncForEach = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
/* eslint-disable @typescript-eslint/no-explicit-any */
const AsyncForEach = (arr, cb) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(arr)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid array");
    }
    for (let index = 0; index < arr.length; index++) {
        yield cb(arr[index], index, arr);
    }
});
exports.AsyncForEach = AsyncForEach;
//# sourceMappingURL=asyncForEach.js.map