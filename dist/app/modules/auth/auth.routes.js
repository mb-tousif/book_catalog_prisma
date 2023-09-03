"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_zod_validation_1 = require("./auth.zod.validation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(auth_zod_validation_1.authValidation.signupValidation), auth_controller_1.authController.signupUser);
router.post('/signin', (0, validateRequest_1.default)(auth_zod_validation_1.authValidation.loginValidation), auth_controller_1.authController.loginUser);
exports.authRoutes = router;
//# sourceMappingURL=auth.routes.js.map