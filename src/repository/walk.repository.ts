import { AppDataSource } from '../data-source';
import { Walk } from '../entity/Walk';

export const WalkRepository = AppDataSource.getRepository(Walk).extend({

    async findWalkBySlug(slug: string): Promise<Walk> {
        return await this.findOne({
            where: { slug },
            relations: ['images']
        });
    },

    async findAllWalks(): Promise<Walk[]> {
        return await this.find({
            relations: ['images']
        });
    },

    async findWalkById(id: number): Promise<Walk> {
        return await this.findOne({
            where: { id },
            relations: ['images']
        })
    }

});