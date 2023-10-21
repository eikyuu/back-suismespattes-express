import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../utils/Exceptions';

import { DestinationRepository } from '../repository/destination.repository';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export default class SearchController {

    static destinationRepository = DestinationRepository;

    static fetchAllDestinationsByMultipleQueries = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

        const queries = request.query;

        if (!queries) {
            return next(new BadRequestException('Données invalides'));
        }

        try {

            const destinations = await this.destinationRepository.findDestinationsByMultipleQueries(queries, parseInt(request.query.page as string), parseInt(request.query.limit as string));

            for (const destination of destinations) {
                const userIsAdmin = await AppDataSource
                    .getRepository(User)
                    .createQueryBuilder("user")
                    .select("user.isAdmin")
                    .where("user.id = :id", { id: destination.user.id })
                    .getOne()
                destination.user = userIsAdmin
            }

            response.status(200).json({
                destinations,
                pagination: {
                    page: parseInt(request.query.page as string),
                    limit: parseInt(request.query.limit as string),
                    total: await this.destinationRepository.findDestinationsByMultipleQueriesCount(queries),
                    totalPages: Math.ceil(await this.destinationRepository.findDestinationsByMultipleQueriesCount(queries) / parseInt(request.query.limit as string))
                }
            });
        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }

    }

} 