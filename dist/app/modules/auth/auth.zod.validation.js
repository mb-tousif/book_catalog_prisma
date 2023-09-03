"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const signupValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
        })
            .min(3)
            .max(255),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(6)
            .max(255),
        role: zod_1.z.enum(['user', 'admin', 'customer'], {
            required_error: 'Role is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact No is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        profileImg: zod_1.z.string().optional(),
    }),
});
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.authValidation = {
    signupValidation,
    loginValidation,
};
//# sourceMappingURL=auth.zod.validation.js.map