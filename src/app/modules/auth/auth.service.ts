import { User } from "@prisma/client";
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { hashPasswordHelper } from "../../../helpers/hashPassword";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { ILoginResponse } from "./auth.interfaces";

// Create user in database
const signupUser = async (payload: User): Promise<Partial<User>> => {
  // Handle if user already exist
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist');
  }
  // Hashing password
  payload.password = await hashPasswordHelper.hashPassword(payload.password);
  console.log(payload.password);

  const user = await prisma.user.create({
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

// Login user
const loginUser = async (payload: User): Promise<ILoginResponse> => {
  // Handle if user already not exist
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not exist');
  }
  // Compare password
  const isPasswordMatch = await hashPasswordHelper.comparePassword(payload.password, isUserExist.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password not match');
  }
  // Generate token
  const token = await jwtHelpers.createToken({
    email: isUserExist.email,
    role: isUserExist.role,
  }, config.jwt.secret as string, config.jwt.expires_in as string);

  return {
    token,
  };
};


export const authService = {
    signupUser,
    loginUser,
};
