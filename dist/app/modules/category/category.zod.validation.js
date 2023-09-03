"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const zodValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required'
        }).min(3).max(255),
    })
});
exports.CategoryValidation = {
    zodValidation
};
//# sourceMappingURL=category.zod.validation.js.map