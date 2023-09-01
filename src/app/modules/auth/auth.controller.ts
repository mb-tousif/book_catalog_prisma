
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

const signupUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

});

export const authController = {
    signupUser,
};
