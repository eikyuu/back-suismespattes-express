import { env } from 'process'
import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'
import e = require('cors')
import { Review } from './entity/Review'
import { User } from './entity/User'
import { Destination } from './entity/Destination'
import { DestinationImage } from './entity/DestinationImage'
import { Category } from './entity/Category'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Destination,
        Review,
        DestinationImage,
        User,
        Category        
    ],
    migrations: [],
    subscribers: [],
})
