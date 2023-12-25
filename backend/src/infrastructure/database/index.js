import { Sequelize } from "sequelize";
import { DB_CONFIG } from "../configs";
import { Logger } from "../../common/utils/loggers";

export const sequelize = new Sequelize(DB_CONFIG.name, DB_CONFIG.username, DB_CONFIG.password, {
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    dialect: "postgres",
    logging: (msg) => Logger.debug(msg),
});
