import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { bookRoutes } from '../modules/book/book.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { orderRoutes } from '../modules/order/order.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
  {
    path: '/categories',
    routes: categoryRoutes,
  },
  {
    path: '/books',
    routes: bookRoutes,
  },
  {
    path: '/orders',
    routes: orderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
