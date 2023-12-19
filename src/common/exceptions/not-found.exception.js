import statuses from "statuses";
import { HTTP_CODE } from "../constants/response-code.const.js";
import { BaseException } from "./base.exception.js";

export class NotFoundException extends BaseException {
    constructor(message = statuses(HTTP_CODE.notFound), code = HTTP_CODE.notFound) {
        super(HTTP_CODE.notFound, message, code);
    }
}
