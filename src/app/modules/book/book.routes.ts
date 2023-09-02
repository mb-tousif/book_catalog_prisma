
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import Auth from '../../middleware/auth';
import ValidateRequest from '../../middleware/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.zod.validation';

const router = express.Router();
router.post("/create-book", 
    Auth(ENUM_USER_ROLE.ADMIN),
    ValidateRequest( BookValidation.postValidation ),
    BookController.createBook
) 

export const bookRoutes = router;
