export class ExpressionException extends Error {
    details;

    /**
     * @param {string} message Developer readable message
     * @param {*} details Error details
     */
    constructor(message, details) {
        super(message);

        this.name = this.constructor.name;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }

    toString() {
        const args = [];

        args.push(this.name, this.message);

        if (this.details) {
            args.push(JSON.stringify(this.details));
        }

        return args.join(" - ");
    }
}
