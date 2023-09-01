import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { hashPasswordHelper } from "../../../helpers/hashPassword";
import prisma from "../../../shared/prisma";

const signupUser = async (payload: User): Promise<User> => {
    // Handle if user already exist
    const isExistUser = await prisma.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (isExistUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exist");
    };
    // Hash password
    payload.password = await hashPasswordHelper.hashPassword(payload.password);
    console.log(payload.password);
    
    const user = await prisma.user.create({
        data: payload,
    });
    return user;
};

export const authService = {
    signupUser,
};
