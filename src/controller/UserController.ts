import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { hashSync } from 'bcryptjs';
import { BadRequestException } from '../utils/Exceptions';
import { validate } from 'class-validator';
import { User } from '../entity/User';

export default class UserController {

    static userRepository = UserRepository

    static save = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

        const { pseudo, email, password } = request.body;

        if (!pseudo || !email || !password) {
            return next(new BadRequestException('Missing data'));
        }

        try {

            const userEmailAlreadyExists = await this.userRepository.findOne({
                where: { email },
            })

            const userPseudoAlreadyExists = await this.userRepository.findOne({
                where: { pseudo },
            })

            if (userEmailAlreadyExists || userPseudoAlreadyExists) {
                return next(new BadRequestException(`User : ${pseudo} already exists or invalid email : ${email}`));
            }

            const user = Object.assign(new User(), request.body);

            const errors = await validate(user);

            if (errors.length > 0) {
                errors.map((error) => {
                    return response.status(400).json({ errors: error.constraints });
                });
                return;
            }

            const hashedPassword = await hashSync(user.password, 12);

            await this.userRepository.save({ ...user, password: hashedPassword });

            response.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }
    }

} 