import { Logger } from "./logger";

export class AccessLogStream {
    write(message) {
        Logger.info(message);
        Logger.info("-------------------------------------------");
        Logger.info("|              Request Ended              |");
        Logger.info("-------------------------------------------");
    }
}
