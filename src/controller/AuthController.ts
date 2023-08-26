import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { compare } from 'bcryptjs';
import { BadRequestException } from '../utils/Exceptions';
import { sign } from 'jsonwebtoken';

export class AuthController {

    static userRepository = UserRepository;

    static login = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
        const { email, password } = request.body;

        if (!email || !password) {
            return next(new BadRequestException({ message: 'Bad email or password' }));
        }

        try {

            const user = await this.userRepository.findOne({
                where: { email },
            })

            if (!user) {
                return next(new BadRequestException('This email is not registered'));
            }

            if (!await compare(password, user.password)) {
                return next(new BadRequestException('Invalid Credentials'));
            }

            const token = sign({
                pseudo: user.pseudo,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION});

            response.json({ 
                token,
                user: {
                    pseudo: user.pseudo,
                    email: user.email,
                }
            });

        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }

    }

} 