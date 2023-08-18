import { NextFunction, Request, Response } from "express"
import { Walk } from '../entity/Walk';
import { formatSlug } from '../utils/Utils';
import axios from 'axios';
import { BadRequestException, NotFoundException } from '../utils/Exceptions';
import multer = require('multer');
import { WalkImage } from '../entity/WalkImage';
import { promisify } from 'util';
import path = require('path');
import { WalkRepository } from '../repository/walk.repository';
import { WalkImageRepository } from '../repository/walkImage.repository';
import fs = require('fs');

export class WalkController {
    private static GEOCODING_URI: string = 'https://maps.googleapis.com/maps/api/geocode/json';
    private static LANGUAGE: string = 'fr';
    private static UPLOAD_DIR: string = process.env.UPLOAD_PATH;
    private GOOGLE_API_KEY: string = process.env.GOOGLE_API_KEY;

    private walkRepository = WalkRepository;
    private walkImageRepository = WalkImageRepository

    /**
     * Retrieves the latitude and longitude coordinates of a given address.
     *
     * @param {string} address - The address to geocode.
     * @return {Promise<{lat: number, lng: number}> | string} - The latitude and longitude coordinates of the address if successful, or an error message if unsuccessful.
     */
    private async geocodeAddress(address: string): Promise<{
        lat: number;
        lng: number;
    }> {
        const geocodingUrl: string = `${WalkController.GEOCODING_URI}?address=${encodeURIComponent(address)}&key=${this.GOOGLE_API_KEY}&language=${WalkController.LANGUAGE}`;
        try {
            const response = await axios.get(geocodingUrl);
            return response.data.results[0].geometry.location;
        } catch (error) {
            return error.message;
        }
    }

    /**
     * Retrieves all walks.
     *
     * @param {Request} request - The request object.
     * @param {Response} response - The response object.
     * @param {NextFunction} next - The next function.
     * @return {Promise<Walk[]>} - A promise that resolves to an array of Walk objects.
     */
    async all(request: Request, response: Response, next: NextFunction): Promise<Walk[]> {
        try {
            const walks: Walk[] = await this.walkRepository.findAllWalks();
            return walks;
        } catch (error) {
            next(error);
        }
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const slug: string = request.params.slug;
            const walk: Walk = await this.walkRepository.findWalkBySlug(slug);
    
            if (!walk) {
                next(new NotFoundException('Walk not found'));
            }
    
            response.json(walk);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Saves a walk based on the provided request data.
     *
     * @param {Request} request - The request object containing the walk data.
     * @param {Response} response - The response object to send the result.
     * @param {NextFunction} next - The next function to handle the request.
     * @return {Promise<Walk>} The saved walk object.
     */
    async save(request: Request, response: Response, next: NextFunction): Promise<Walk> {

        let slug = formatSlug(request.body.name);

        let latitude: number;
        let longitude: number;

        try {
            const geocodeResult = await this.geocodeAddress(`${request.body.postalCode} ${request.body.city} ${request.body.country}`);
            latitude = geocodeResult.lat;
            longitude = geocodeResult.lng;
        } catch (error) {
            return error.message;
        }

        const walk = Object.assign(new Walk(), {
            ...request.body,
            slug : slug,
            latitude: request.body.latitude ? request.body.latitude : latitude,
            longitude: request.body.longitude ? request.body.longitude : longitude,
        });

        try {
            if (!walk || typeof walk !== "object") {
                next(new BadRequestException('Walk not found'));
            }
            await this.walkRepository.save(walk);
            return walk;
        } catch (error) {
            return error.message;
        }
    }

    /**
     * Removes a walk from the database and associated images.
     *
     * @param {Request} request - The HTTP request object.
     * @param {Response} response - The HTTP response object.
     * @param {NextFunction} next - The next function in the middleware chain.
     * @return {Promise<void>} - A Promise that resolves when the walk has been removed.
     */
    async remove(request: Request, response: Response, next: NextFunction): Promise<void> {
        const slug: string = request.params.slug;

        const walkToRemove: Walk = await this.walkRepository.findWalkBySlug(slug);

        //delete les images associées à la balade

        const filenames = walkToRemove.images.map(image => image.name);

        await Promise.all(filenames.map(async (filename) => {
            await this.removeImage(filename);
        }));

        if (!walkToRemove) {
            next(new NotFoundException('Walk not found'));
        }

        try {
            await this.walkRepository.remove(walkToRemove);
            response.json("Walk has been removed");
        } catch (error) {
            next(error);
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
    async uploadImage(request: Request, response: Response, next: NextFunction): Promise<void> {
        const unlinkAsync = promisify(fs.unlink)

        let filename = '';
        const uploadDir = path.join(WalkController.UPLOAD_DIR, 'walks');

        //create folder if not exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, WalkController.UPLOAD_DIR + '/walks/')
            },
            filename: function (req, file, cb) {
                const fileExtension = file.originalname.split('.').pop();
                filename = `${file.fieldname}-${Date.now()}.${fileExtension}`;
                cb(null, filename)
            }
        })

        const upload = multer({ storage: storage }).single('image')

        upload(request, response, async function (err) {
            
            const slug = formatSlug(request.body.slug);
            const walk = await WalkRepository.findWalkBySlug(slug);

            if (err) {
                console.error(err);
                return next(err);
            }

            if (!walk) {
                if (request.file) {
                    await unlinkAsync(WalkController.UPLOAD_DIR + '/walks/' + filename)
                }
                return next(new NotFoundException('Walk not found'));
            }

            if (!request.file) {
                return next(new BadRequestException('No file uploaded'));
            }

            if (request.file.size > 300000) {
                await unlinkAsync(WalkController.UPLOAD_DIR + '/walks/' + filename)
                return next(new BadRequestException('File too large'));
            }

            if (request.file.mimetype !== 'image/jpeg' && request.file.mimetype !== 'image/png') {
                await unlinkAsync(WalkController.UPLOAD_DIR + '/walks/' + filename)
                return next(new BadRequestException('Invalid file type'));
            }

            const walkImage = new WalkImage();
            walkImage.name = request.file.filename;
            walkImage.walk = walk;

            try {
                await WalkImageRepository.saveWalkImage(walkImage);
                return response.send({ message: "Image has been uploaded" });
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
    async removeImage(filename: string): Promise<string> {

        const unlinkAsync = promisify(fs.unlink);

        await unlinkAsync(WalkController.UPLOAD_DIR + '/walks/' + filename)

        return "image has been removed";
    }

    /**
     * Retrieves an image based on the given filename from the walkImageRepository
     * and sends it as a response.
     *
     * @param {Request} request - the HTTP request object
     * @param {Response} response - the HTTP response object
     * @param {NextFunction} next - the next middleware function
     * @return {void}
     */
    async getImage(request: Request, response: Response, next: NextFunction): Promise<void> {

        const walkImage = await this.walkImageRepository.findWalkImageByFilename(request.params.filename);

        if (!walkImage) {
            return next(new NotFoundException('Image not found'));
        }

        return response.sendFile(path.resolve(WalkController.UPLOAD_DIR + '/walks/' + walkImage.name))

    }

}