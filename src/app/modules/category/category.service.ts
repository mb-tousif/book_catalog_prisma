import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createCategory = ( payload: Category ): Promise<Category> => {
    const isExist = await prisma.category.findFirst({
        where: {
            title: payload.title
        }
    });
    if (isExist) {
        throw new Error('Category already exists');
    }

export const CategoryService = {

};
