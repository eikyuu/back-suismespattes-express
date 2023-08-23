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
                id: user.id,
                nom: user.pseudo,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION});
    
            response.json({ token });

        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }

    }

    static logout = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        response.cookie('accessToken', '', { maxAge: 0, secure: true, httpOnly: true });
        response.cookie('refreshToken', '', { maxAge: 0, secure: true, httpOnly: true });
        response.json({
            message: 'success'
        })
    }

} 