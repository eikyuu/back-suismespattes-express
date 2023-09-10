import { NextFunction, Request, Response } from "express"
import { formatSlug } from '../utils/Utils';
import axios from 'axios';
import { BadRequestException, NotFoundException } from '../utils/Exceptions';
import multer = require('multer');
import { promisify } from 'util';
import path = require('path');
import fs = require('fs');
import sharp = require('sharp');
import { DestinationRepository } from '../repository/destination.repository';
import { DestinationImageRepository } from '../repository/destinationImage.repository';
import { Destination } from '../entity/Destination';
import { DestinationImage } from '../entity/DestinationImage';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class DestinationController {
    static GEOCODING_URI: string = 'https://maps.googleapis.com/maps/api/geocode/json';
    static LANGUAGE: string = 'fr';
    static UPLOAD_DIR: string = process.env.UPLOAD_PATH;
    static GOOGLE_API_KEY: string = process.env.GOOGLE_API_KEY;

    static destinationRepository = DestinationRepository;
    static destinationImageRepository = DestinationImageRepository

    /**
     * Retrieves the latitude and longitude coordinates of a given address.
     *
     * @param {string} address - The address to geocode.
     * @return {Promise<{lat: number, lng: number}> | string} - The latitude and longitude coordinates of the address if successful, or an error message if unsuccessful.
     */
    static geocodeAddress = async (address: string): Promise<{
        lat: number;
        lng: number;
    }>  => {
        const geocodingUrl: string = `${DestinationController.GEOCODING_URI}?address=${encodeURIComponent(address)}&key=${this.GOOGLE_API_KEY}&language=${DestinationController.LANGUAGE}`;
        try {
            const response = await axios.get(geocodingUrl);
            return response.data.results[0].geometry.location;
        } catch (error) {
            return error.message;
        }
    }

    /**
     * Retrieves all destinations.
     *
     * @param {Request} request - The request object.
     * @param {Response} response - The response object.
     * @param {NextFunction} next - The next function.
     * @return {Promise<Destination[]>} - A promise that resolves to an array of Destination objects.
     */
    static all = async (request: Request, response: Response, next: NextFunction): Promise<Record<string, any>> => {
        try {
            const destinations: Destination[] = await this.destinationRepository.findAllDestinations();
            
            for (const destination of destinations) {
                const userIsAdmin = await AppDataSource
                .getRepository(User)
                .createQueryBuilder("user")
                .select("user.isAdmin")
                .where("user.id = :id", { id: destination.user.id })
                .getOne()
                destination.user = userIsAdmin
            }

            return response.json(destinations);
        } catch (error) {
            next(error);
        }
    }

    static one = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const slug: string = request.params.slug;
            const destination: Destination = await this.destinationRepository.findDestinationBySlug(slug);
    
            if (!destination) {
                next(new NotFoundException({ message: 'Cette destination n\'existe pas' }));
            }
    
            response.json(destination);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Saves a destination based on the provided request data.
     *
     * @param {Request} request - The request object containing the destination data.
     * @param {Response} response - The response object to send the result.
     * @param {NextFunction} next - The next function to handle the request.
     * @return {Promise<Destination>} The saved destination object.
     */
    static save = async (request: Request, response: Response, next: NextFunction): Promise<Record<string, any> | void> => {
        let formattedSlug = formatSlug(request.body.name);
        let latitude: number;
        let longitude: number;
        try {
            const geocodeResult = await this.geocodeAddress(`${request.body.postalCode} ${request.body.city} ${request.body.country}`);
            latitude = geocodeResult.lat;
            longitude = geocodeResult.lng;
        } catch (error) {
            return next(new Error(error.message));
        }

        const destination = Object.assign(new Destination(), {
            ...request.body,
            slug : formattedSlug,
            latitude: request.body.latitude ? request.body.latitude : latitude,
            longitude: request.body.longitude ? request.body.longitude : longitude,
        });

        try {
            if (!destination || typeof destination !== "object") {
              return next(new BadRequestException('Requête invalide'));
            }

            const destinationToCheck = await this.destinationRepository.findDestinationBySlug(destination.slug);
            if (destinationToCheck) {
                return next(new BadRequestException({ message: 'Cette destination existe déja' }));
            }

            await this.destinationRepository.save(destination);
            response.json({ ok: true, destination });
        } catch (error) {
           return next(new BadRequestException({ message: error.message }));
        }
    }

    static update = async (request: Request, response: Response, next: NextFunction): Promise<Record<string, any> | void> => {
        const slug: string = request.params.slug;
        const destinationToUpdate: Destination = await this.destinationRepository.findDestinationBySlug(slug);
        if (!destinationToUpdate) {
            return next(new NotFoundException({ message: 'Cette destination n\'existe pas' }));
        }

        let newSlug = formatSlug(request.body.name);

        try {
            
            const destination = Object.assign(destinationToUpdate, request.body, { 
                slug: newSlug
            });
            await this.destinationRepository.save({
                ...destination
            });
            return response.json(destination);
        }
        catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }
    }


    /**
     * Removes a destination from the database and associated images.
     *
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next function in the middleware chain.
     * @return {Promise<void>} - A Promise that resolves when the destination has been removed.
     */
   static remove = async (request: Request, response: Response, next: NextFunction): Promise<void>  => {
        const slug: string = request.params.slug;

        const destinationToRemove: Destination = await this.destinationRepository.findDestinationBySlug(slug);

        //delete les images associées à la balade

        const filenames = destinationToRemove.images.map(image => image.name);

        await Promise.all(filenames.map(async (filename) => {
            await this.removeImage(filename);
        }));

        if (!destinationToRemove) {
           return next(new NotFoundException({ message: 'Cette destination n\'existe pas' }));
        }

        try {
            await this.destinationRepository.remove(destinationToRemove);
            response.json({ message: 'Destination supprimée' });
        } catch (error) {
            return next(new BadRequestException({ message: error.message }));
        }
    }

    /**
     * Uploads an image.
     *
     * @param {Request} request - the request object
     * @param {Response} response - the response object
     * @param {NextFunction} next - the next function
     * @return {Promise<void>} - a promise that resolves when the image is uploaded
     */
    static uploadImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const unlinkAsync = promisify(fs.unlink)

        let filename = '';
        const uploadDir = path.join(DestinationController.UPLOAD_DIR, 'destination');

        //create folder if not exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const storage = multer.diskStorage({
            destination: (req, file, done) => {
                done(null, DestinationController.UPLOAD_DIR + '/destination/')
            },
            filename: (req, file, done)  =>{
                filename = `${file.fieldname}-${Date.now()}`;
                done(null, filename)
            }
        })

        const upload = multer({ storage }).single('image')

        upload(request, response, async function (error) {
            
            const slug = formatSlug(request.body.slug);
            const destination = await DestinationRepository.findDestinationBySlug(slug);

            if (error) {
                console.error(error);
                return next(new BadRequestException({ message: error.message }));
            }

            if (!destination) {
                if (request.file) {
                    await unlinkAsync(DestinationController.UPLOAD_DIR + '/destination/' + filename)
                }
                return next(new NotFoundException({ message: 'Cette destination n\'existe pas' }));
            }

            if (!request.file) {
                return next(new BadRequestException({ message: 'Fichier invalide' }));
            }

            if (request.file.size > 5 * 1024 * 1024) {
                await unlinkAsync(DestinationController.UPLOAD_DIR + '/destination/' + filename)
                return next(new BadRequestException({ message: 'Fichier trop volumineux' }));
            }

            if (request.file.mimetype !== 'image/jpeg' && request.file.mimetype !== 'image/png') {
                await unlinkAsync(DestinationController.UPLOAD_DIR + '/destination/' + filename)
                return next(new BadRequestException({ message: 'Fichier invalide' }));
            }

            const newFilename = path.join(DestinationController.UPLOAD_DIR + '/destination/' + filename + '.webp');
            await sharp(request.file.path).rotate().resize(1140, 760).webp({ quality: 100}).toFile(newFilename);
            await unlinkAsync(DestinationController.UPLOAD_DIR + '/destination/' + filename)

            const destinationImage = new DestinationImage();
            destinationImage.name = filename + '.webp';
            destinationImage.destination = destination;

            try {
                await DestinationImageRepository.saveDestinationImage(destinationImage);
                return response.json({ok: true, message: "Image correctement uploadée" });
            } catch (error) {
                return next({ error: error.message, status: 500 });
            }

        });
    }

    /**
     * Removes an image file.
     *
     * @param {string} filename - The name of the image file to be removed.
     * @return {Promise<string>} - A promise that resolves to a string indicating that the image has been removed.
     */
    static removeImage = async (filename: string): Promise<string> => {

        const unlinkAsync = promisify(fs.unlink);

        await unlinkAsync(DestinationController.UPLOAD_DIR + '/destination/' + filename)

        return "Image supprimée";
    }

    /**
     * Retrieves an image based on the given filename from the destinationImageRepository
     * and sends it as a response.
     *
     * @param {Request} request - the HTTP request object
     * @param {Response} response - the HTTP response object
     * @param {NextFunction} next - the next middleware function
     * @return {void}
     */
    static getImages = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

        const destinationImage: DestinationImage = await this.destinationImageRepository.findDestinationImageByFilename(request.params.filename);

        if (!destinationImage) {
            return next(new NotFoundException({ message: 'Cette destination n\'existe pas' }));
        }

        return response.sendFile(path.resolve(DestinationController.UPLOAD_DIR + '/destination/' + destinationImage.name))

    }

    static removeDestinationImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const destination: Destination = await this.destinationRepository.findDestinationBySlug(request.params.slug);

        if (!destination) {
            return next(new NotFoundException({ message: 'Cette destination n\'existe pas' }));
        }

        const filenames: string[] = destination.images.map(image => image.name);

        for (const filename of filenames) {
            await this.removeImage(filename);
        }

        this.destinationImageRepository.removeDestinationImageByDestination(destination);

        response.json({ message: 'Destination image supprimée' });

    }

}
