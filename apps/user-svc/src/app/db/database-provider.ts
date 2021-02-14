import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import { User } from './entity/user';
import { CreateFirstUser1596659507467 } from './migrations/1596659507467-CreateFirstUser';

dotenv.config();

const { env } = process;

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: env.POSTGRES_HOST || 'localhost',
  // tslint:disable-next-line:radix
  port: env.POSTGRES_PORT ? parseInt(env.POSTGRES_PORT as string) : 5432,
  username: env.POSTGRES_USER || 'postgres',
  password: env.POSTGRES_PASSWORD || 'password',
  database: env.POSTGRES_DATABASE || 'user',
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
