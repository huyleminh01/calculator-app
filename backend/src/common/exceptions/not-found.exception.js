import statuses from "statuses";
import { HTTP_CODE } from "../constants/response-code.const";
import { BaseException } from "./base.exception";

export class NotFoundException extends BaseException {
    constructor(message = statuses(HTTP_CODE.notFound), code = HTTP_CODE.notFound) {
        super(HTTP_CODE.notFound, message, code);
    }
}
