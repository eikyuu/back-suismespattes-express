import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../utils/Exceptions';
import { CityRepository } from '../repository/city.repository';

export default class CityController {

    static cityRepository = CityRepository;

    static fetchAllCityBySearch = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

        const search = request.query.q;

        if (!search) {
            return next(new BadRequestException('Données invalides'));
        }

        try {

            const city = await this.cityRepository.findCityBySearch(search as string);

            response.status(200).json(city);
        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }
    }

} 