import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "./profile.service";

// Bonus: get user profile
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const user = await ProfileService.getProfile(token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: user,
  });
});

export const ProfileController = {
    getProfile,
};
