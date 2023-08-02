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

    // insert new users for test
    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Timber",
    //         lastName: "Saw",
    //         age: 27
    //     })
    // )

    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Phantom",
    //         lastName: "Assassin",
    //         age: 24
    //     })
    // )

    console.log(`Express application is up and running on port ${env.PORT}`)

}).catch(error => console.log(error))
