import { z } from 'zod';

const postValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3)
      .max(180),
    author: z
      .string({
        required_error: 'Author is required',
      })
      .min(3)
      .max(180),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(1)
      .max(10000),
    genre: z
      .string({
        required_error: 'Genre is required',
      })
      .min(3)
      .max(180),
    publicationDate: z
      .string({
        required_error: 'PublicationDate is required',
      })
      .min(3)
      .max(180),
    categoryId: z
      .string({
        required_error: 'CategoryId is required',
      })
      .min(3)
      .max(180),
  }),
});

const updateValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const BookValidation = {
  postValidation,
  updateValidation,
};