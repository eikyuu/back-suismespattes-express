import { NextFunction, Request, Response } from 'express';
import { CategoryRepository } from '../repository/category.repository';
import { Category } from '../entity/Category';

export class CategoryController {

    static categoryRepository = CategoryRepository;
    /**
     * Retrieves all categories.
     *
     * @param {Request} request - The request object.
     * @param {Response} response - The response object.
     * @param {NextFunction} next - The next function.
     * @return {Promise<Category[]>} - A promise that resolves to an array of Category objects.
     */
    static all = async (request: Request, response: Response, next: NextFunction): Promise<Record<string, any>> => {
        try {
            const categories: Category[] = await this.categoryRepository.findAll();
            return response.json(categories);
        } catch (error) {
            next(error);
        }
    }

} 