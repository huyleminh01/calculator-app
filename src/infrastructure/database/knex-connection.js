import knex from "knex";
import { DB_CONFIG } from "../configs/index.js";

export const DbConnection = knex({
    client: "pg",
    connection: {
        connectionString: DB_CONFIG.connectionString,
    },
    migrations: { tableName: "migrations" },
});
