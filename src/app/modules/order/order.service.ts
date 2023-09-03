import { Order, OrderedBook } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AsyncForEach } from '../../../helpers/asyncForEach';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { TOrder } from './orderedBook.interface';

// Get: getOrders - get all orders for Admin and Customer who made the order 
const getAllOrders = async (token:string):Promise<Order[] | undefined> => {
    const decodedToken = jwtHelpers.verifyToken(
        token,
        process.env.JWT_SECRET as string
    );

    if (decodedToken.role === "customer") {
        const orders = await prisma.order.findMany({
            where: {
                userId: decodedToken.userId,
            },
            include: {
                orderedBooks: true,
            },
        });
        return orders;
    }else if (decodedToken.role === "admin") {
        const orders = await prisma.order.findMany({
            include: {
                orderedBooks: true,
            },
        });
        return orders;
    }
};

// Post: createOrder - create an order for a user
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
    getAllOrders,
    createOrder,
};
