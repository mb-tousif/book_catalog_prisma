import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import Auth from '../../middleware/auth';
import { ProfileController } from './profile.controller';

const router = express.Router();
router.get(
  '/',
  Auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  ProfileController.getProfile
);
export const profileRoutes = router;
