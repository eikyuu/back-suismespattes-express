const express = require("express");
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { ExceptionsHandler } from './middlewares/exceptions.handler'
import { UnknownRoutesHandler } from './middlewares/unknownRoutes.handler'
import 'dotenv/config'
import { env } from 'process'
import cors = require('cors')
import { getFiles } from './utils/Utils';
import { send } from './email/nodemailer';
import { dumpDatabase } from './scheduledFunctions/scheduledFunctions';
import { createReadStream } from 'fs';
const fs = require('fs')

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json());

    /**
     * On dit à Express que l'on souhaite autoriser tous les noms de domaines
     * à faire des requêtes sur notre API.
     */
    app.use(cors())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    });

    /**
     * On dit à Express que l'on souhaite parser le body des requêtes en JSON
     *
     * @example app.post('/', (req) => req.body.prop)
     */
    app.use(express.json());

    app.get('/hello', (req, res) => {
        res.status(200).send({ message: 'hello world' });
    });

    app.post('/folder', async (req, res) => {
        const { folder } = req.body;
        try {
            const files = await getFiles(folder);
            res.json(files);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/send', async (req, res) => {
        try {

            const sqlFileContent = fs.readFileSync(`${process.env.UPLOAD_PATH}/1692456601.dump.sql`, 'utf-8');

            await send({
                "form": "v.duguet.dev@gmail.com",
                "to": "v.duguet.dev@gmail.com",
                "subject": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
                "text": `Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}`,
                "html": `<b>Dump database ${process.env.DB_NAME}, ${new Date().toLocaleString()}</b> ${sqlFileContent}`,
                "attachments": [
                  {
                    "filename": "1692456601.dump.sql",
                    "path": `${process.env.UPLOAD_PATH}/1692456601.dump.sql`,
                    "contents": createReadStream(`${process.env.UPLOAD_PATH}/1692456601.dump.sql`),
                    
                  }
                ]
              })

            res.json("Mail sent");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.use(express.static('uploads'));
    app.use(express.static('data'));

    /**
     * Pour toutes les autres routes non définies, on retourne une erreur
     */
    app.all('*', UnknownRoutesHandler);

    /**
     * Gestion des erreurs
     * /!\ Cela doit être le dernier `app.use`
     */
    app.use(ExceptionsHandler);

    /**
     * On demande à Express d'ecouter les requêtes sur le port défini dans la config
     */
    app.listen(env.PORT);

    // CRON 
    //dumpDatabase();

    console.log(`Express application is running`)

}).catch(error => console.log(error))
