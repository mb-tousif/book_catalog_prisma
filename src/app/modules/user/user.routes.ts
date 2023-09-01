import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import Auth from '../../middleware/auth';
import { userController } from './user.controller';

const router = express.Router();
router.get('/', Auth(ENUM_USER_ROLE.ADMIN), userController.getAllUsers);
export const userRoutes = router;
