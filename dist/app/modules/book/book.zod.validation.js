"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required',
        })
            .min(3)
            .max(180),
        author: zod_1.z
            .string({
            required_error: 'Author is required',
        })
            .min(3)
            .max(180),
        price: zod_1.z
            .number({
            required_error: 'Price is required',
        })
            .min(1)
            .max(10000),
        genre: zod_1.z
            .string({
            required_error: 'Genre is required',
        })
            .min(3)
            .max(180),
        publicationDate: zod_1.z
            .string({
            required_error: 'PublicationDate is required',
        })
            .min(3)
            .max(180),
        categoryId: zod_1.z
            .string({
            required_error: 'CategoryId is required',
        })
            .min(3)
            .max(180),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        genre: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    postValidation,
    updateValidation,
};
//# sourceMappingURL=book.zod.validation.js.map