import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { hashSync } from 'bcryptjs';
import { BadRequestException, NotFoundException } from '../utils/Exceptions';
import { validate } from 'class-validator';
import { User } from '../entity/User';
import multer = require('multer');
import { promisify } from 'util';
import sharp = require('sharp');
import path = require('path');
import fs = require('fs');
import { DestinationRepository } from '../repository/destination.repository';

export default class UserController {

    static userRepository = UserRepository
    static destinationRepository = DestinationRepository
    static UPLOAD_DIR: string = process.env.UPLOAD_PATH;

    static save = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

        const { pseudo, email, password } = request.body;

        if (!pseudo || !email || !password) {
            return next(new BadRequestException('Données invalides'));
        }

        try {

            const userEmailAlreadyExists = await this.userRepository.findOne({
                where: { email },
            })

            const userPseudoAlreadyExists = await this.userRepository.findOne({
                where: { pseudo },
            })

            if (userEmailAlreadyExists || userPseudoAlreadyExists) {
                return next(new BadRequestException(`Utilisateur : ${pseudo} existe déja ou email invalid : ${email}`));
            }

            const user = Object.assign(new User(),
                request.body,
                { roles: ['ROLE_USER'] }
            );

            const errors = await validate(user);

            if (errors.length > 0) {
                errors.map((error) => {
                    return response.status(400).json({ errors: error.constraints });
                });
                return;
            }

            const hashedPassword = hashSync(user.password, 12);

            await this.userRepository.save({ ...user, password: hashedPassword });

            response.status(201).json({ message: 'Utilisateur crée' });
        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }
    }

    static one = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        const user = await this.userRepository.findUserById(request.params.id);
        if (!user) {
            return next(new NotFoundException('Utilisateur introuvable'));
        }
        return response.json(user);
    }

    static fetchDestinationsByUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const userId = request.params.id;

        try {
            const destinations = await this.destinationRepository.findDestinationsByUserId(userId);
            response.json(destinations);
        } catch (error) {
            next(error);
        }
    }

    static getPicture = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

        const user = await UserRepository.findUserById(request.params.id);

        if (!user) {
            return next(new BadRequestException('Cet utilisateur n\'existe pas'));
        }

        if (!user.picture) {
            return next(new BadRequestException('Aucune image'));
        }

        const filename = path.resolve(UserController.UPLOAD_DIR + '/user/' + user.picture);

        return response.sendFile(filename);
    }

    static update = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

        const UserToUpdate = await this.userRepository.findUserById(request.params.id);
        
        if (!UserToUpdate) {
            return next(new BadRequestException('Cet utilisateur n\'existe pas'));
        }

        try {
            const user = Object.assign(new User(),
                UserToUpdate,
                request.body,
            );

            if (user.password && user.password !== UserToUpdate.password) {
                const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                if (user.password && !passwordRegex.test(user.password)) {
                    return next(new BadRequestException({ message: 'Mot de passe trop faible (8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)' }));
                }
                const hashedPassword = hashSync(user.password, 12);
                user.password = hashedPassword;
            } else {
                user.password = UserToUpdate.password;
            }
            await this.userRepository.save({ ...user });

            response.status(201).json({ message: 'Utilisateur mis à jour' });
        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }
    }

    static uploadPicture = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        const unlinkAsync = promisify(fs.unlink)

        let filename = '';
        const uploadDir = path.join(UserController.UPLOAD_DIR, 'user');

        //create folder if not exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const storage = multer.diskStorage({
            destination: (req, file, done) => {
                done(null, UserController.UPLOAD_DIR + '/user/')
            },
            filename: (req, file, done) => {
                filename = `${file.fieldname}-${Date.now()}`;
                done(null, filename)
            }
        })
        const upload = multer({ storage }).single('image')

        upload(request, response, async (error) => {

            const user = await UserRepository.findUserById(request.params.id);

            const image = sharp(request.file.path);

            const newFilename = path.join(UserController.UPLOAD_DIR + '/user/' + filename + '.webp');
            const resizedImage = image.rotate().resize({
                fit: sharp.fit.contain,
                width: 1920
            }).webp({ quality: 100 });
            await resizedImage.toFile(newFilename);

            await unlinkAsync(UserController.UPLOAD_DIR + '/user/' + filename)

            user.picture = filename + '.webp';
            await UserRepository.save(user);
            return response.status(201).json({ message: 'Image modifiée', image: filename + '.webp' });
        })
    }
        
} 