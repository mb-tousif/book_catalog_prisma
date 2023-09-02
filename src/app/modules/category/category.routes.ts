import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import Auth from '../../middleware/auth';
import ValidateRequest from '../../middleware/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.zod.validation';

const router = express.Router();
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post(
  '/create-category',
  Auth(ENUM_USER_ROLE.ADMIN),
  ValidateRequest(CategoryValidation.zodValidation),
  CategoryController.createCategory
);
router.patch(
  '/:id',
  Auth(ENUM_USER_ROLE.ADMIN),
  ValidateRequest(CategoryValidation.zodValidation),
  CategoryController.updateCategoryById
);
router.delete(
  '/:id',
  Auth(ENUM_USER_ROLE.ADMIN),
  ValidateRequest(CategoryValidation.zodValidation),
  CategoryController.deleteCategoryById
);

export const categoryRoutes = router;
