import { Category } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";

const getAllCategories = catchAsync(async (req:Request, res: Response):Promise<Category[]> => {
    const categories = await CategoryService.getAllCategories();
    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories fetched successfully',
        data: categories
    });

    return categories;
});

const getCategoryById = catchAsync(async (req:Request, res: Response):Promise<Category> => {
    const categoryId = req.params.id;
    const category = await CategoryService.getCategoryById(categoryId);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category fetched successfully',
        data: category
    });

    return category;
});

const createCategory = catchAsync(async (req:Request, res: Response):Promise<Category> => {
    const category = await CategoryService.createCategory(req.body);
    
    sendResponse( res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Category created successfully',
        data: category
    });

    return category;
});

const updateCategoryById = catchAsync(async (req:Request, res: Response):Promise<Category> => {
    const categoryId = req.params.id;
    const payload = req.body;

    const category = await CategoryService.updateCategoryById(categoryId, payload);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully',
        data: category
    });

    return category;
});

const deleteCategoryById = catchAsync(async (req:Request, res: Response):Promise<Category> => {
    const categoryId = req.params.id;
    const category = await CategoryService.deleteCategoryById(categoryId);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully',
        data: category
    });

    return category;
});

export const CategoryController = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById
};
