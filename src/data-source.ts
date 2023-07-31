import { env } from 'process'
import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'
import e = require('cors')

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.DB_HOST || "localhost",
    port: 3306,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["src/entity/*.ts"],
    migrations: [],
    subscribers: [],
})
