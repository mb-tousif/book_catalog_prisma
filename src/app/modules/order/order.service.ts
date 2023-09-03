import { Order, OrderedBook } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AsyncForEach } from '../../../helpers/asyncForEach';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { TOrder } from './orderedBook.interface';

const createOrder = async (token: string, payload: TOrder):Promise<Order> => {
  const decodedToken = jwtHelpers.verifyToken(
    token,
    process.env.JWT_SECRET as string
  );
  const { orderedBooks } = payload;
//   check if the user already has an order with same books in orderedBooks
    const userOrders = await prisma.order.findMany({
        where: {
            userId: decodedToken.userId,
        },
        include: {
            orderedBooks: true,
        },
    });
    const userOrderWithSameBooks = userOrders.find((order) => {
        const orderedBooksIds = order.orderedBooks.map((orderedBook) => orderedBook.bookId);
        const payloadBooksIds = orderedBooks.map((orderedBook) => orderedBook.bookId);
        return orderedBooksIds.every((bookId) => payloadBooksIds.includes(bookId));
    });
    if (userOrderWithSameBooks) {
        throw new ApiError(httpStatus.BAD_REQUEST, "You already have an order with same books");
    }
  const orderWithBooks = await prisma.$transaction(async transactionClient => {
    const order = await transactionClient.order.create({
      data: {
        userId: decodedToken.userId,
      },
      include: {
        orderedBooks: true,
      },
    });
    await AsyncForEach(orderedBooks, async (book: OrderedBook) => {
      await transactionClient.orderedBook.createMany({
        data: {
          orderId: order.id,
          bookId: book.bookId,
          quantity: +book.quantity,
        },
      });
    });

    return order;
  });
  return orderWithBooks;
};

export const OrderService = {
  createOrder,
};
