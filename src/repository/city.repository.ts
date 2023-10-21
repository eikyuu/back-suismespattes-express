import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import { City } from '../entity/City';

export const CityRepository = AppDataSource.getRepository(City).extend({

    async findAll(): Promise<City[]> {
        return await this.find();
    },

    async findCityBySearch(search: string): Promise<City[]> {
        return await this.find(
            { where: 
                { label: Like(`%${search}%`) 
            },
            relations: ['destinations'],
            order: {
                label: 'DESC'
            }
        });
    },

    async findCityByCodePostal(codePostal: string): Promise<City> {
        return await this.find({
            where: { postalCode: codePostal },
            order: {
                label: 'DESC'
            }
        });
    }
});