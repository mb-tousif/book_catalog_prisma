import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BookService } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response)=> {
    const payload = req.body;
    const book = await BookService.createBook(payload);
    if (!book) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Book not created");
    }
    sendResponse( res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Book created successfully",
        data: book
    })
});

export const BookController = {
    createBook,
};
