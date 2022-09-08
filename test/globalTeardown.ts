import dotenv from 'dotenv';

import { clearDatabase, closeDatabaseConnection, createDatabaseConnection } from "../src/utils/database";

const globalTeardown = async (): Promise<void> => {
    try {
        console.log('Starting test environment teardown.')
        dotenv.config({
            path: `.env.${process.env.NODE_ENV}`,
        });

        await createDatabaseConnection().then(() => {
            console.log('Database connection stablished.');
        })
        console.log('Starting test database cleanup');
        await clearDatabase().then(() => {
            console.log('Database cleanup completed')
        })
    } catch (error) {
        await closeDatabaseConnection()
        console.error(error.message);
    }

}

export default globalTeardown();