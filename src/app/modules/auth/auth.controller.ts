
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authService } from "./auth.service";

const signupUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await authService.signupUser(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully",
        data: user,
    });

});

export const authController = {
    signupUser,
};
