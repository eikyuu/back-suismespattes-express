import { AppDataSource } from '../data-source';
import { Destination } from '../entity/Destination';

export const DestinationRepository = AppDataSource.getRepository(Destination).extend({

    async findDestinationBySlug(slug: string): Promise<Destination> {
        return await this.findOne({
            where: { slug },
            relations: ['images', 'category']
        });
    },

    async findAllDestinations(): Promise<Destination[]> {
        return await this.find({
            relations: ['images', 'category', 'user']
        });
    },

    async findPaginatedDestinations(page: number, limit: number): Promise<Destination[]> {
        return this.find({
            relations: ['images', 'category', 'user'],
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC'
            }
        });
    },

    async findDestinationById(id: number): Promise<Destination> {
        return await this.findOne({
            where: { id },
            relations: ['images', 'category']
        })
    },

    async saveDestination(destination: Destination): Promise<Destination> {
        return await this.save(destination);
    },

    async removeDestinationBySlug(slug: string): Promise<Destination> {
        return await this.delete({
           slug
        });
    }

});