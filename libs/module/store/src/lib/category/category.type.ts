import { z } from 'zod';

export const categorySchema = z.object({
    categoryId: z.string(),
    categoryName: z.string(),
    description: z.string(),
});
export const categoriesSchema = z.array(categorySchema);
export type Category = z.infer<typeof categorySchema>;
export type Categories = Category[];

export const createCategoryRequestSchema = z.object({
    categoryName: z.string(),
    description: z.string(),
});
export type CreateCategoryRequest = z.infer<typeof createCategoryRequestSchema>;


