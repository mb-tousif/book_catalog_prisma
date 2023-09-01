
import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user id');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
});

export const userController = {
    getAllUsers,
    getUserById,
};
