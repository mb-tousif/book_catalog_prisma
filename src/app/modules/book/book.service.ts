import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { TQueryParams } from './book.interfaces';

const getAllBooks = async (queryPayload: TQueryParams) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search,
    minPrice,
    maxPrice,
    category,
  } = queryPayload;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);
  const query: Prisma.BookFindManyArgs = {
    where: {
      AND: [
        minPrice ? { price: { gte: parseFloat(minPrice.toString()) } } : {},
        maxPrice ? { price: { lte: parseFloat(maxPrice.toString()) } } : {},
        category ? { categoryId: category } : {},
        search
          ? {
              OR: [
                {
                  title: { contains: search, mode: 'insensitive' },
                },
                {
                  author: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  genre: { contains: search, mode: 'insensitive' },
                },
              ],
            }
          : {},
      ],
    },
    orderBy: {
      [sortBy as string]: sortOrder,
    },
    skip,
    take,
  };

  const books = await prisma.book.findMany({
    where: query.where,
    orderBy: query.orderBy,
    skip: query.skip,
    take: query.take,
    include: {
      category: true,
    },
  });
  if (books.length <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Books not found');
  }
  const total = await prisma.book.count({
    where: query.where,
  });
  const totalPages = Math.ceil(total / Number(limit));
  return {
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
    data: books,
  };
};

const getBookByCategoryId = async (id: string): Promise<Book> => {
  const book = await prisma.book.findFirst({
    where: {
      categoryId: id,
    },
  });
  if (!book) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book not found');
  }
  return book;
};

const getBookById = async (id: string): Promise<Book> => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!book) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book not found');
  }
  return book;
};

const createBook = async (payload: Book): Promise<Book> => {
  const isExist = await prisma.book.findFirst({
    where: {
      title: payload.title,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exist');
  }
  const book = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return book;
};

const updateBookById = async (id: string, payload: Book): Promise<Book> => {
  const isExist = await prisma.book.findFirst({
    where: {
      title: payload.title,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exist');
  }
  const book = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return book;
};

const deleteBookById = async (id: string): Promise<Book> => {
  const book = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return book;
};

export const BookService = {
  getAllBooks,
  getBookByCategoryId,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
