import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { compare, hashSync } from 'bcryptjs';
import { BadRequestException } from '../utils/Exceptions';
import { sign } from 'jsonwebtoken';
import { send } from '../email/nodemailer';
import { validate } from 'class-validator';
const crypto = require('crypto');

export class AuthController {

    static userRepository = UserRepository;

    static login = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
        const { email, password } = request.body;

        if (!email || !password) {
            return next(new BadRequestException({ message: 'Mauvais identifiants' }));
        }

        try {

            const user = await this.userRepository.findOne({
                where: { email },
            })

            if (!user) {
                return next(new BadRequestException('Cette utilisateur n\'existe pas'));
            }

            if (!await compare(password, user.password)) {
                return next(new BadRequestException('Mot de passe incorrect'));
            }

            const token = sign({
                pseudo: user.pseudo,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION});

            user.token = token;
            user.tokenExpiresAt = new Date(Date.now() + 2592000000);

            await this.userRepository.save(user);

            response.json({ 
                token,
                user: {
                    pseudo: user.pseudo,
                    email: user.email,
                    roles: user.roles
                }
            });

        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }

    }

    static forgetPassword = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
        const { email } = request.body;

        if (!email) {
            return next(new BadRequestException({ message: 'Email manquant' }));
        }

        try {

            const user = await this.userRepository.findOne({
                where: { email },
            })

            if (!user) {
                return response.json({ message: 'Si cette adresse email existe, un email vous a été envoyé' });
            }

           user.resetToken = crypto.randomBytes(8).toString('hex');
           user.resetTokenExpiresAt = new Date(Date.now() + 86400);

           await this.userRepository.save(user);
            await send({
                "from": `Suismespattes <${process.env.EMAIL}>`,
                "to": user.email,
                "subject": "Demande de réinitialisation de mot de passe",
                "text": `Demande de réinitialisation de mot de passe`,
                template: 'resetPassword',
                context:{
                    resetToken: user.resetToken,
                    user: user
                }
              })


            response.json({ message: 'Si cette adresse email existe, un email vous a été envoyé' });

        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }
    }

    static resetPassword = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
        const { resetToken, password } = request.body;

        if (!resetToken || !password) {
            return next(new BadRequestException({ message: 'Données invalides' }));
        }

        // regex password (8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return next(new BadRequestException({ message: 'Mot de passe trop faible (8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)' }));
        }

        try {

            const user = await this.userRepository.findOne({
                where: { resetToken },
            })

            if (!user) {
                return next(new BadRequestException('Token invalide ou expiré')); 
            }

            user.password = hashSync(password, 12);
            user.resetToken = null;
            user.resetTokenExpiresAt = null;

            await this.userRepository.save(user);

            response.json({ message: 'Mot de passe réinitialisé' });

        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }
    }

    static confirmCode = async(request: Request, response: Response, next: NextFunction): Promise<any> => {
        const { resetToken } = request.body;

        if (!resetToken) {
            return next(new BadRequestException({ message: 'Données invalides' }));
        }

        try {

            const user = await this.userRepository.findOne({
                where: { resetToken },
            })

            if (!user) {
                return next(new BadRequestException('Token invalide ou expiré')); 
            }

            response.json({ message: 'Token valide' });

        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }
    }
} 