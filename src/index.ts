const express = require("express");
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { ExceptionsHandler } from './middlewares/exceptions.handler'
import { UnknownRoutesHandler } from './middlewares/unknownRoutes.handler'
import 'dotenv/config'
import { env } from 'process'
import cors = require('cors')
import { getFiles } from './utils/Utils';
import routes from "./routes";
import { send } from './email/nodemailer';
import e = require('cors');

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json());

    /**
     * On dit à Express que l'on souhaite autoriser tous les noms de domaines
     * à faire des requêtes sur notre API.
     */
    app.use(cors())

    /**
     * On dit à Express que l'on souhaite parser le body des requêtes en JSON
     *
     * @example app.post('/', (req) => req.body.prop)
     */
    app.use(express.json());

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
                "form": process.env.GMAIL_USER,
                "to": process.env.EMAIL,
                "subject": subject,
                "html": `You got a message from 
                Email : ${email}
                Message: ${message}`,
              })
            res.status(200).send({ message: "mail send" });
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

    console.log(`Express application is running`)

}).catch(error => console.log(error))
