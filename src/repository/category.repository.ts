import { AppDataSource } from '../data-source';
import { Category } from '../entity/Category';

export const CategoryRepository = AppDataSource.getRepository(Category).extend({

    async findAll(): Promise<Category[]> {
        return await this.find();
    },

});