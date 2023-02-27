"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_1 = require("../controllers/room");
const validation_1 = require("../middlewares/validation");
const room_2 = require("../validation/room");
const authenticate_1 = require("../middlewares/authenticate");
const router = express_1.default.Router();
//ADMIN
router.post('/rooms-types', authenticate_1.authenticate, authenticate_1.checkIfIsAdmin, (0, validation_1.validationMiddleware)(room_2.roomTypeSchema), room_1.createRoomType);
router.get('/rooms-types', authenticate_1.authenticate, authenticate_1.checkIfIsAdmin, room_1.getRoomType);
router.delete('/delete-room-type/:roomTypeId', authenticate_1.authenticate, authenticate_1.checkIfIsAdmin, room_1.deleteRoomTypeById);
router.patch('/edit-room-type/:roomTypeId', authenticate_1.authenticate, authenticate_1.checkIfIsAdmin, room_1.updateRoomTypeById);
//GENERAL
router.get('/rooms', authenticate_1.authenticate, room_1.getRoombySearchAndFilter);
router.post('/rooms', authenticate_1.authenticate, (0, validation_1.validationMiddleware)(room_2.createRoomSchema), room_1.createRoom);
router.patch('/rooms/:roomId', authenticate_1.authenticate, room_1.updateRoomById);
router.delete('/rooms/:roomId', authenticate_1.authenticate, room_1.deleteRoomById);
exports.default = router;
