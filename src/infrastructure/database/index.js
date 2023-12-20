import { Sequelize } from "sequelize";
import { DB_CONFIG } from "../configs";

export const sequelize = new Sequelize(DB_CONFIG.name, DB_CONFIG.username, DB_CONFIG.password, {
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    dialect: "postgres",
});
