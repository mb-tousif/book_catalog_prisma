
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import Auth from '../../middleware/auth';
import ValidateRequest from '../../middleware/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.zod.validation';

const router = express.Router();
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookByCategoryId);
router.get('/:id', BookController.getBookById);
router.post("/create-book", 
    Auth(ENUM_USER_ROLE.ADMIN),
    ValidateRequest( BookValidation.postValidation ),
    BookController.createBook
);
router.patch("/:id",
    Auth(ENUM_USER_ROLE.ADMIN),
    ValidateRequest( BookValidation.updateValidation ),
    BookController.updateBookById
);
router.delete("/:id",
    Auth(ENUM_USER_ROLE.ADMIN),
    BookController.deleteBookById
);

export const bookRoutes = router;
