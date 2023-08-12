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
    private static GEOCODING_URI: string = 'https://maps.googleapis.com/maps/api/geocode/json';
    private static LANGUAGE: string = 'fr';
    private static UPLOAD_DIR: string = 'src/../uploads/walks/';
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

    async save(request: Request, response: Response, next: NextFunction): Promise<Walk> {

        //ajouter erreur si manque un champ
        // ajouter enum pour les champs obligatorye
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
                next(new BadRequestException('Walk not found'));
            }
            await this.walkRepository.save(walk);
            return walk;
        } catch (error) {
            return error.message;
        }
    }

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

        upload(request, response, async function (err) {

            const walk: Walk = await WalkRepository.findWalkBySlug(request.body.slug);

            if (err) {
                console.error(err);
                return next(err);
            }

            if (!walk) {
                if (request.file) {
                    await unlinkAsync(WalkController.UPLOAD_DIR + filename)
                }
                return next(new NotFoundException('Walk not found'));
            }

            if (!request.file) {
                return next(new BadRequestException('No file uploaded'));
            }

            const walkImage = Object.assign(new WalkImage(), {
                name: request.file.filename,
                walk: walk,
            });

            try {
                await WalkImageRepository.saveWalkImage(walkImage);
                return response.send('Image uploaded successfully');
            } catch (error) {
                return next({ error: error.message, status: 500 });
            }

        });

    }

    async removeImage(filename): Promise<string> {

        const unlinkAsync = promisify(fs.unlink);

        await unlinkAsync(WalkController.UPLOAD_DIR + filename)

        return "image has been removed";
    }

    async getImage(request: Request, response: Response, next: NextFunction) {

        const walkImage = await this.walkImageRepository.findWalkImageByFilename(request.params.filename);

        if (!walkImage) {
            next(new NotFoundException('Image not found'));
        }

        return response.sendFile(path.resolve(WalkController.UPLOAD_DIR + walkImage.name))

    }

        // methode qui retourne les fichiers d'un dossier (ici les images) 
    getFiles = (dir: string): Promise<string[]> => {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
    };

    async getFolder(request: Request, response: Response, next: NextFunction) {
        //get form data
        const { folder } = request.body;
        try {
            const files = await this.getFiles(folder);
            response.json(files);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

}