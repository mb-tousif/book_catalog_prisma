import { Category } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const getAllCategories = async (): Promise<Category[]> => {
    const categories = await prisma.category.findMany({});
    if (categories.length <= 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Categories not found');
    }
    return categories;
};

const getCategoryById = async ( categoryId: string ): Promise<Category> => {
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    });
    if (!category) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
    }

    return category;
};

const createCategory = async (payload: Category): Promise<Category> => {
  const isExist = await prisma.category.findFirst({
    where: {
      title: payload.title,
    },
  });
  if (isExist) {
    throw new Error('Category already exists');
  }
  const category = await prisma.category.create({
    data: payload,
  });
  return category;
};

const updateCategoryById = async ( categoryId: string, payload: Partial<Category> ): Promise<Category> => {
    // handle duplicate data in existing categories (title) in database
    const isExist = await prisma.category.findFirst({
        where: {
            title: payload.title
        }
    });
    if (isExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Category already exists');
    }
    const category = await prisma.category.update({
        where: {
            id: categoryId
        },
        data: payload
    });

    return category;
};

const deleteCategoryById = async ( categoryId: string ): Promise<Category> => {
    const category = await prisma.category.delete({
        where: {
            id: categoryId
        }
    });

    if (!category) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
    }

    return category;

};

export const CategoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
};
