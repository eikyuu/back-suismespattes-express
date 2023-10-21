const express = require("express");
import * as bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import { ExceptionsHandler } from './middlewares/exceptions.handler'
import { UnknownRoutesHandler } from './middlewares/unknownRoutes.handler'
import 'dotenv/config'
import { env } from 'process'
import cors = require('cors')
import { getFiles } from './utils/Utils';
import routes from "./routes";
import { send } from './email/nodemailer';
import { limiter } from './middlewares/limiter';
const fs = require('fs')

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json());

    /**
     * On dit à Express que l'on souhaite autoriser tous les noms de domaines
     * à faire des requêtes sur notre API.
     */

    const corsOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions));

    /**
     * On dit à Express que l'on souhaite parser le body des requêtes en JSON
     *
     * @example app.post('/', (req) => req.body.prop)
     */
    app.use(express.json());

    /**
     * Middleware limitant le nombre de requêtes pour toutes les routes
     */
    app.use(limiter);

    app.use("/", routes);

    app.post('/folder', async (req, res) => {
        const { folder } = req.body;
        try {
            const files = await getFiles(folder);
            res.json(files);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/single/:filename',function(req,res) {
        const filename = req.params.filename;
        const file = `${process.env.UPLOAD_PATH}/${filename}`;
         
        // Download function provided by express
        res.download(`${file}`, function(err) {
            if(err) {
                console.log(err);
            }
        })
    })

    app.post('/contact', async (req, res) => {
        const { email, subject, message } = req.body;
        try {
            await send({
                "from": `Contact <${process.env.EMAIL}>`,
                "to": process.env.EMAIL,
                "subject": subject,
                "text": message,
                template: 'email',
                context:{
                    email: email,
                    message: message 
                }
              })
            res.status(200).send({ message: "mail send" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    //rename directory
    app.post('/rename', async (req, res) => {

        const oldPath = '/data/walks';
        const newPath = '/data/destination';
        const renameDirectory = (oldPath: string, newPath: string): Promise<void> => {
            return new Promise((resolve, reject) => {
              fs.rename(oldPath, newPath, (error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve();
                }
              });
            });
          };
        await renameDirectory(oldPath, newPath);

        res.status(200).send({ message: "directory renamed" });
    })

    app.use(express.static('data/destination'));
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

    console.log(`Express application is running on http://localhost:${env.PORT}`);

}).catch(error => console.log(error))
