import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import Auth from '../../middleware/auth';
import ValidateRequest from '../../middleware/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.zod.validation';

const router = express.Router();
router.get('/', Auth(ENUM_USER_ROLE.ADMIN), userController.getAllUsers);
router.get('/:id', Auth(ENUM_USER_ROLE.ADMIN), userController.getUserById);
router.patch('/:id', Auth(ENUM_USER_ROLE.ADMIN),
 ValidateRequest(userValidation.updateValidation) ,
 userController.updateUserById);
router.delete('/:id', Auth(ENUM_USER_ROLE.ADMIN), userController.deleteUserById);
export const userRoutes = router;
