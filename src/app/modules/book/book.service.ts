import { Book } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const createBook = async ( payload:Book ): Promise<Book> => {
    const isExist = await prisma.book.findFirst({
        where: {
            title: payload.title
        }
    });
    if (isExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Book already exist");
    }
    const book = await prisma.book.create({
        data: payload,
        include: {
            categories: true
        }
    });
    return book;
};

export const BookService = {
    createBook,
};
