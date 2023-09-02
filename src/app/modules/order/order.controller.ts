import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const payload = req.body;
    const result = await OrderService.createOrder(token as string, payload);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        message: "Order created successfully",
        token,
        success: result,
    })
});

export const OrderController = {
    createOrder,
};
