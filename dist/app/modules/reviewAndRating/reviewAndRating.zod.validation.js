"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewAndRatingValidation = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({})
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.reviewAndRatingValidation = {
    postValidation,
    updateValidation
};
//# sourceMappingURL=reviewAndRating.zod.validation.js.map