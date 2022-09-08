import dotenv from 'dotenv';

import { clearDatabase, createDatabaseConnection } from "../src/utils/database";

const globalTeardown = async (): Promise<void> => {
    console.log('Starting test environment teardown.')
    dotenv.config({
        path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env",
    });

    await createDatabaseConnection().then(() => {
        console.log('Database connection stablished.');
    })
    console.log('Starting test database cleanup');
    await clearDatabase().then(() => {
        console.log('Database cleanup completed')
    });
}

export default globalTeardown();