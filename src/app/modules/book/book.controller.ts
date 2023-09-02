import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BookService } from "./book.service";

const getAllBooks = catchAsync(async (req: Request, res: Response)=> {
    const queryPayload = req.query;
    const data = await BookService.getAllBooks(queryPayload);
    
    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Books fetched successfully",
        meta: data.meta,
        data: data.data
    });
});

const getBookByCategoryId = catchAsync(async (req: Request, res: Response)=> {
    const categoryId = req.params.id;
    const book = await BookService.getBookByCategoryId(categoryId);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book fetched successfully by categoryId",
        data: book
    });
});

const getBookById = catchAsync(async (req: Request, res: Response)=> {
    const id = req.params.id;
    const book = await BookService.getBookById(id);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book fetched successfully by Book ID",
        data: book
    });
});

const createBook = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const book = await BookService.createBook(payload);
  if (!book) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book not created');
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data: book,
  });
});

const updateBookById = catchAsync(async (req: Request, res: Response)=> {
    const id = req.params.id;
    const payload = req.body;

    const updatedBook = await BookService.updateBookById(id, payload);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book updated successfully",
        data: updatedBook
    });
});

const deleteBookById = catchAsync(async (req: Request, res: Response)=> {
    const id = req.params.id;
    const deletedBook = await BookService.deleteBookById(id);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book deleted successfully",
        data: deletedBook
    });
});


export const BookController = {
    getAllBooks,
    getBookByCategoryId,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById
};
