import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { hashPasswordHelper } from "../../../helpers/hashPassword";
import prisma from "../../../shared/prisma";

// Get all users service
const getAllUsers =async (): Promise<Partial<User>[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
//   handle [] for users data
  if (!users) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Users not found');
  }
  return users;
};

// Get user by id service
const getUserById = async (userId: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};

const updateUserById = async (userId: string, payload: Partial<User>): Promise<Partial<User>> => {
  //  handle duplicate user data in existing user table by email
  console.log(payload);
  
  if (payload.email && payload.email.length > 0) {
   const isExist = await prisma.user.findFirst({
     where: {
       email: payload.email,
     },
   });
   if (isExist) {
     throw new ApiError(
       httpStatus.BAD_REQUEST,
       'New data may be duplicate with existing user data'
     );
   }
  }
  // handle update password with hash
  if (payload.password && payload.password.length > 0) {
    payload.password = await hashPasswordHelper.hashPassword(payload.password);
  }
  const user = prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};

// Define user by id
const deleteUserById = (userId: string): Promise<Partial<User>> => {
  const user = prisma.user.delete({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};

export const userService = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
