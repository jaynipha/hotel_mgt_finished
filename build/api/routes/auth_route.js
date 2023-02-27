"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const validation_1 = require("../middlewares/validation");
const auth_2 = require("../validation/auth");
const router = express_1.default.Router();
router.post('/sign-up', (0, validation_1.validationMiddleware)(auth_2.signupSchema), auth_1.signUp);
router.post('/sign-in', (0, validation_1.validationMiddleware)(auth_2.signinSchema), auth_1.signIn);
router.get('/get-users', auth_1.getAllUser);
router.delete('/delete-user', auth_1.deleteUser);
exports.default = router;
