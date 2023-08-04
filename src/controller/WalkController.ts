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
const fs = require('fs')

export class WalkController {
    private static GEOCODING_URI: string =
        'https://maps.googleapis.com/maps/api/geocode/json';
    private static LANGUAGE: string = 'fr';
    private static UPLOAD_DIR: string = 'src/../uploads/walks/'
    private GOOGLE_API_KEY: string = process.env.GOOGLE_API_KEY;

    private walkRepository = WalkRepository;
    private walkImageRepository = WalkImageRepository

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

    async all(request: Request, response: Response, next: NextFunction): Promise<Walk[]> {
        try {
            const walks: Walk[] = await this.walkRepository.findAllWalks();
            return walks;
        } catch (error) {
            return error.message;
        }
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<Walk> {

        const slug: string = request.params.slug;

        const walk: Walk = await this.walkRepository.findWalkBySlug(slug);

        if (!walk) {
            throw new NotFoundException('Walk not found');
        }

        return walk
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<Walk> {

        //ajouter erreur si manque un champ
        // ajouter enum pour les champs obligatoryLe
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
            return error.message;
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
            if (!walk || typeof walk !== "object") {
                throw new Error("Invalid walk object");
            }
            await this.walkRepository.save(walk);
            return walk;
        } catch (error) {
            return error.message;
        }
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<string> {
        const slug = request.params.slug;

        let walkToRemove: Walk = await this.walkRepository.findWalkBySlug(slug);

        if (!walkToRemove) {
            throw new NotFoundException('Walk not found');
        }

        await this.walkRepository.remove(walkToRemove);

        return "walk has been removed";
    }

    async uploadImage(request: Request, response: Response, next: NextFunction) {

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

        try {
            this.newMethod(upload, request, response, unlinkAsync, filename);
            return "image has been uploaded";
        } catch (error) {
            throw new Error('Error while uploading image');
        }

    }

    private newMethod(upload, request, response: Response<any, Record<string, any>>, unlinkAsync: Function, filename: string) {
        upload(request, response, async function (err) {

            const walk: Walk = await WalkRepository.findWalkBySlug(request.body.slug);
            if (err) {
                throw new Error('Error while uploading image');
            }

            if (!walk) {
                await unlinkAsync(WalkController.UPLOAD_DIR + filename);
                throw new NotFoundException('Walk not found');
            }

            if (!request.file) {
                throw new BadRequestException('Image not found');
            }

            const walkImage = Object.assign(new WalkImage(), {
                name: request.file.filename,
                walk: walk,
            });

            await WalkImageRepository.saveWalkImage(walkImage);

            return "image has been uploaded";
        });
    }

    async removeImage(request: Request, response: Response, next: NextFunction): Promise<string> {

        const unlinkAsync = promisify(fs.unlink);

        const filename = request.params.filename;

        const walkImageToRemove: WalkImage = await this.walkImageRepository.findWalkImageByFilename(filename);

        if (!walkImageToRemove) {
            throw new NotFoundException('Image not found');
        }

        await unlinkAsync(WalkController.UPLOAD_DIR + walkImageToRemove.name)

        await this.walkImageRepository.remove(walkImageToRemove);

        return "image has been removed";
    }

    async getImage(request: Request, response: Response, next: NextFunction) {

        const walkImage = await this.walkImageRepository.findWalkImageByFilename(request.params.filename);

        if (!walkImage) {
            throw new NotFoundException('Image not found');
        }

        return response.sendFile(path.resolve(WalkController.UPLOAD_DIR + walkImage.name))

    }

}