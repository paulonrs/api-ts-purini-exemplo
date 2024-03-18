import { Sequelize } from 'sequelize';
import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
    database: process.env.DATABASE_NAME || 'postgres',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
};

const pool:Pool = new Pool({
    host: databaseConfig.host,
    port: databaseConfig.port,
    database: databaseConfig.database,
    user: databaseConfig.user,
    password: databaseConfig.password,
});

const sequelizeConnection:Sequelize = 
    new Sequelize(
        databaseConfig.database, 
        databaseConfig.user, 
        databaseConfig.password,
        {
            host: databaseConfig.host,
            dialect: 'postgres',
            port: databaseConfig.port,
            pool: {
                ...pool,
                max: 5,
                min: 0,
                idle: 10000
            },
        }
    );

export default sequelizeConnection;