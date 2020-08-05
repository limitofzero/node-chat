import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

const { env } = process;

const ENTITIES_PATH = './entity/**/*.ts';
const MIGRATIONS_PATH = './migrations/**/*.ts';

const resolvePathTo = (relPath: string) => resolve(__dirname, relPath);

export const typeOrmConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: parseInt(env.POSTGRES_PORT as string),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        resolvePathTo(ENTITIES_PATH)
    ],
    migrations: [
        resolvePathTo(MIGRATIONS_PATH)
    ],
    migrationsRun: true
};
