import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from "express"
import { Walk } from '../entity/Walk';
import { formatSlug } from '../utils/Utils';
import axios from 'axios';
import { BadRequestException, NotFoundException } from '../utils/Exceptions';
import multer = require('multer');
import { WalkImage } from '../entity/WalkImage';
import { promisify } from 'util';
import path = require('path');
const fs = require('fs')

export class WalkController {
    private static GEOCODING_URI: string =
        'https://maps.googleapis.com/maps/api/geocode/json';
    private static LANGUAGE: string = 'fr';
    private static UPLOAD_DIR: string = 'src/../uploads/walks/'
    private API_KEY: string = 'AIzaSyDMDWV5GAYR9e_deQcW6YtWGdfSHNi3r58';

    // constructor(apiKey: string) {
    //     this.API_KEY = apiKey;
    // }

    //    private validateApiKey(apiKey: string) {
    //     // Add validation logic here to ensure the API key is valid and authorized
    //     // Example: check against a list of allowed API keys or verify with an authentication service
    //     return true; // Replace with actual validation logic
    //   }

    private walkRepository = AppDataSource.getRepository(Walk);

    private async geocodeAddress(address: string): Promise<{
        lat: number;
        lng: number;
    }> {
        const geocodingUrl: string = `${WalkController.GEOCODING_URI}?address=${encodeURIComponent(address)}&key=${this.API_KEY}&language=${WalkController.LANGUAGE}`;
        try {
            const response = await axios.get(geocodingUrl);
            return response.data.results[0].geometry.location;
        } catch (error) {
            throw new Error('Geocoding error');
        }
    }

    async all(request: Request, response: Response, next: NextFunction): Promise<Walk[]> {
        try {
            const walks: Walk[] = await this.walkRepository.find({
                relations: ['images'],
            });
            return walks;
        } catch (error) {
            throw new Error('Error while fetching walks');
        }
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<Walk> {

        const slug = request.params.slug;

        const walk = this.findWalkBySlug(slug);

        if (!walk) {
            throw new NotFoundException('Walk not found');
        }

        return walk
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<Walk> {
        const {
            name,
            description,
            city,
            postalCode,
            street,
            country,
            obligatoryLeash,
            waterPoint,
            processionaryCaterpillarAlert,
            cyanobacteriaAlert,
            note,
        } = request.body;

        let slug = formatSlug(name);

        let latitude: number;
        let longitude: number;

        try {
            const geocodeResult = await this.geocodeAddress(`${postalCode} ${city} ${country}`);
            latitude = geocodeResult.lat;
            longitude = geocodeResult.lng;
        } catch (error) {
            console.log(error);
            return error;
        }

        const walk = Object.assign(new Walk(), {
            name,
            slug,
            description,
            city,
            postalCode,
            street,
            country,
            latitude,
            longitude,
            obligatoryLeash,
            waterPoint,
            processionaryCaterpillarAlert,
            cyanobacteriaAlert,
            note,
        });

        try {
            await this.walkRepository.save(walk);
            return walk;
        } catch (error) {
            throw new Error('Error while saving walk');
        }
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<string> {
        const id = parseInt(request.params.id)

        let walkToRemove: Walk = await this.walkRepository.findOne({
            where: { id },
        });

        if (!Number.isInteger(id)) {
            throw new BadRequestException('Invalid id');
        }

        await this.walkRepository.remove(walkToRemove);

        return "walk has been removed";
    }

    findWalkBySlug = (slug: string) => {
        return this.walkRepository.findOne({
            where: { slug },
            relations: ['images'],
        });
    }

    // upload image for a walk by s1ug
    async uploadImage(request: Request, response: Response, next: NextFunction): Promise<string> {

        const unlinkAsync = promisify(fs.unlink)

        let filename = '';

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, WalkController.UPLOAD_DIR)
            },
            filename: function (req, file, cb) {
                filename = file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop();
                cb(null, filename)
            }
        })

        const upload = multer({ storage: storage }).single('image')

        const saveWalkImage = (walkImage: WalkImage) => {

            return AppDataSource.getRepository(WalkImage).save(walkImage);
        }

        upload(request, response, async function (err) {

            const walk = await this.findWalkBySlug(request.body.slug);

            if (err) {
                throw new Error('Error while uploading image');
            }

            if (!walk) {
                await unlinkAsync(WalkController.UPLOAD_DIR + filename)
                throw new NotFoundException('Walk not found');
            }

            if (!request.file) {
                throw new BadRequestException('Image not found');
            }

            const walkImage = Object.assign(new WalkImage(), {
                name: request.file.filename,
                walk: walk,
            });

            await saveWalkImage(walkImage);

            return "image has been uploaded";
        });

        return "image has been uploaded";
    }

    async removeImage(request: Request, response: Response, next: NextFunction): Promise<string> {

        const unlinkAsync = promisify(fs.unlink)

        const id = parseInt(request.params.id)

        let walkImageToRemove: WalkImage = await AppDataSource.getRepository(WalkImage).findOne({
            where: { id },
        });

        if (!Number.isInteger(id)) {
            throw new BadRequestException('Invalid id');
        }

        await unlinkAsync(WalkController.UPLOAD_DIR + walkImageToRemove.name)

        await AppDataSource.getRepository(WalkImage).remove(walkImageToRemove);

        return "image has been removed";
    }

    async getImage(request: Request, response: Response, next: NextFunction) {

        const slug = request.params.slug

        const walkImage = await AppDataSource.getRepository(WalkImage).findOne({
            where: { name: slug },
        })
        console.log('walkimage', walkImage);

        if (!walkImage) {
            throw new NotFoundException('Image not found');
        }

        const file = path.resolve(WalkController.UPLOAD_DIR + walkImage.name)

        return response.sendFile(file)

    }

}