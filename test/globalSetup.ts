
import * as tsNode from 'ts-node';
import dotenv from 'dotenv';

import { createDatabaseConnection } from "../src/utils/database";

tsNode.register()

const globalSetup = async (): Promise<void> => {
    dotenv.config({
        path: `.env.${process.env.NODE_ENV}`,
    });

    console.log('\n');
    const connection = await createDatabaseConnection();

    console.log('Checking for migrations not executed...');
    const migrationNotExecuted = await connection.showMigrations();

    if (migrationNotExecuted) {
        console.log('Running migrations on test database');

        await connection.runMigrations().then(() => {
            console.log('Migrations executed successfuly');
        })
    }

    await connection.close();

    console.log('\n');

}

export default globalSetup;