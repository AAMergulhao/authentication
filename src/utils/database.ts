
import { createConnection, Connection, getConnection } from "typeorm";

// import databaseConfig from "../config/databaseConfig";

const createDatabaseConnection = async (): Promise<Connection> => {
    console.log({
        type: "mysql",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        logging: false,
        entities: [
            "src/entity/**/*.ts"
        ],
        migrations: [
            "src/migration/**/*.ts"
        ],
        subscribers: [
            "src/subscriber/**/*.ts"
        ],
        cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber"
        }
    });

    return await createConnection({
        type: "mysql",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        logging: false,
        entities: [
            "src/entity/**/*.ts"
        ],
        migrations: [
            "src/migration/**/*.ts"
        ],
        subscribers: [
            "src/subscriber/**/*.ts"
        ],
        cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber"
        }
    });
}

const closeDatabaseConnection = async (): Promise<void> => {
    return await getConnection().close();
}

const clearDatabase = async (): Promise<void> => {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    await connection.query(`SET FOREIGN_KEY_CHECKS=0`);

    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        // await repository.query(`DELETE FROM ${entity.tableName}`);
        await repository.query(`DROP TABLE ${entity.tableName}`);
    }
    // await connection.query(`DELETE FROM migrations`);
    await connection.query(`DROP TABLE migrations`);

    await connection.query(`SET FOREIGN_KEY_CHECKS=1`);

    await connection.close();
}


export { createDatabaseConnection, closeDatabaseConnection, clearDatabase }