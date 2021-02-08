import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import { User } from './entity/user';
import { CreateFirstUser1596659507467 } from './migrations/1596659507467-CreateFirstUser';

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
        User
    ],
    migrations: [
        CreateFirstUser1596659507467
    ],
    migrationsRun: true
};
