import statuses from "statuses";
import { HTTP_CODE } from "../constants/response-code.const";
import { BaseException } from "./base.exception";

export class BadRequestException extends BaseException {
    constructor(message = statuses(HTTP_CODE.badRequest), code = HTTP_CODE.badRequest) {
        super(HTTP_CODE.badRequest, message, code);
    }
}
