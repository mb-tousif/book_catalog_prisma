
import express from 'express';
import ValidateRequest from '../../middleware/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.zod.validation';

const router = express.Router();
router.post('/signup', 
    ValidateRequest(authValidation.signupValidation),
    authController.signupUser
);

export const authRoutes = router;
