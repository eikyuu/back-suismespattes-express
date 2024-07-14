import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Destination } from '../entity/Destination';
import { stat } from 'fs';

export const DestinationRepository = AppDataSource.getRepository(Destination).extend({

    async findDestinationBySlug(slug: string): Promise<Destination> {
        return await this.findOne({
            where: { slug },
            relations: ['images', 'category', 'user', 'city']
        });
    },

    async findAllDestinations(): Promise<Destination[]> {
        return await this.find({
            relations: ['images', 'category', 'user', 'city']
        });
    },

    async findAllPublishedDestinations(): Promise<Destination[]> {
        return await this.find({
            where: { status: 'PUBLISHED' },
            relations: ['images', 'category', 'user', 'city']
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
            relations: ['images', 'category', 'user', 'city'],
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC'
            }
        })
    },

    async countDestinationsByCategoryId(id: string): Promise<number> {
        return await this.count({
            where: { 
                where: { status: 'PUBLISHED' },
                category: { id } },
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
                where: { status: 'PUBLISHED' },
                name: Like(`%${search}%`)
            },
            relations: ['images', 'category', 'user', 'city'],
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
                where: { status: 'PUBLISHED' },
                name: Like(`%${search}%`)
            },
            relations: ['images', 'category', 'user', 'city']
        });
    },

    async findPaginatedDestinations(page: number, limit: number): Promise<Destination[]> {
        return this.find({
            where: { status: 'PUBLISHED' },
            relations: ['images', 'category', 'user', 'city'],
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC'
            }
        });
    },

    async findDestinationsByMultipleQueries(queries: any, page: number, limit: number): Promise<Destination[]> {
        return this.find({
            where: {
                name: queries.name || undefined,
                category: { name: queries.category || undefined },
                city : {
                    label: queries.city || undefined,
                    regionName: queries.region || undefined,
                    departmentName: queries.department || undefined,
                },
                country :queries.country || undefined,
                status: 'PUBLISHED',
            },
            relations: ['images', 'category', 'user', 'city'],
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC'
            }
        })
    },

    async findDestinationsByMultipleQueriesCount(queries: any): Promise<number> {
        return this.count({
            where: {
                name: queries.name || undefined,
                category: { name: queries.category || undefined },
                city : {
                    label: queries.city || undefined,
                    regionName: queries.region || undefined,
                    departmentName: queries.department || undefined,
                },
                country :queries.country || undefined,
                status: 'PUBLISHED',
            },
        });
    },

    async findDestinationsByUserId(id: string): Promise<Destination[]> {
        return await this.find({
            where: { user: { id } },
            relations: ['images', 'category', 'user', 'city'],
            order: {
                createdAt: 'DESC'
            }
        })
    }

});