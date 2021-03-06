import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const typeOrmConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: env.POSTGRES_HOST,
    // tslint:disable-next-line:radix
    port: parseInt(env.POSTGRES_PORT as string),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        // User
    ],
    migrations: [
    ],
    migrationsRun: true
};
