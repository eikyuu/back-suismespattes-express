import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Destination } from '../entity/Destination';

export const DestinationRepository = AppDataSource.getRepository(Destination).extend({

    async findDestinationBySlug(slug: string): Promise<Destination> {
        return await this.findOne({
            where: { slug },
            relations: ['images', 'category', 'user']
        });
    },

    async findAllDestinations(): Promise<Destination[]> {
        return await this.find({
            relations: ['images', 'category', 'user']
        });
    },

    async findDestinationById(id: number): Promise<Destination> {
        return await this.findOne({
            where: { id },
            relations: ['images', 'category']
        })
    },

    async findDestinationsByCategoryId(id: string, page: number, limit: number): Promise<Destination[]> {
        return await this.find({
            where: { category: { id } },
            relations: ['images', 'category', 'user'],
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC'
            }
        })
    },

    async countDestinationsByCategoryId(id: string): Promise<number> {
        return await this.count({
            where: { category: { id } },
        });
    },

    async saveDestination(destination: Destination): Promise<Destination> {
        return await this.save(destination);
    },

    async removeDestinationBySlug(slug: string): Promise<Destination> {
        return await this.delete({
           slug
        });
    },

    async findFilteredDestinations(search: string, page: number, limit: number): Promise<Destination[]> {
        return this.find({
            where: {
                name: Like(`%${search}%`)
            },
            relations: ['images', 'category', 'user'],
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC'
            }
        });
    },

    async findAllNameBySearch(search: string): Promise<Destination[]> {
        return this.find({
            where: {
                name: Like(`%${search}%`)
            },
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

    async findDestinationByName(name: string): Promise<Destination> {
        return await this.findOne({
            where: { name },
            relations: ['images', 'category', 'user']
        });
    },

});