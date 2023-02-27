"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const joi_1 = __importDefault(require("joi"));
function validationMiddleware(schema) {
    return (req, res, next) => {
        const { error } = joi_1.default.object()
            .keys(schema)
            .validate({
            ...req.body,
            ...req.params,
            ...req.query,
        });
        const valid = error == null;
        if (valid) {
            next();
        }
        else {
            const { details } = error;
            const message = details.map((i) => i.message).join(',');
            res.status(422).send({ status: false, message });
        }
    };
}
exports.validationMiddleware = validationMiddleware;
