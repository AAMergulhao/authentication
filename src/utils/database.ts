
import { createConnection, Connection, getConnection } from "typeorm";

import databaseConfig from "../config/databaseConfig";

const createDatabaseConnection = async (): Promise<Connection> => {
    return await createConnection(databaseConfig);
}

const closeDatabaseConnection = async (): Promise<void> => {
    return await getConnection().close();
}


export { createDatabaseConnection, closeDatabaseConnection }