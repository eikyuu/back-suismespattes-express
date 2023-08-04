import { env } from 'process'
import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'
import e = require('cors')
import { join } from 'path'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [join(__dirname, '/entity/**/*.{ts,js}')],
    migrations: [],
    subscribers: [],
})
