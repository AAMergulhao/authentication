
import { createConnection, Connection } from "typeorm";
import colors from 'colors';

import databaseConfig from "../config/databaseConfig";

const createDatabaseConnection = async (): Promise<void | Connection> => {
    return await createConnection(databaseConfig).catch((error) => {
        console.log(colors.red(`Database connection could not be stablished: ${error.message}`));
        process.exit();
    });
}

export { createDatabaseConnection }