import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import Auth from '../../middleware/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.get('/', Auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), OrderController.getAllOrders);
router.post(
  '/create-order',
  Auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);

export const orderRoutes = router;