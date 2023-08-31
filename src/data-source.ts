import { env } from 'process'
import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'
import e = require('cors')
import { Walk } from './entity/Walk'
import { Review } from './entity/Review'
import { WalkImage } from './entity/WalkImage'
import { User } from './entity/User'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [
        Walk,
        Review,
        WalkImage,
        User
    ],
    migrations: [],
    subscribers: [],
})
