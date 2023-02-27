import express from 'express';
import {
	createRoom,
	getRoomType,
	deleteRoomById,
	createRoomType,
	updateRoomById,
	getRoombySearchAndFilter,
	deleteRoomTypeById,
	updateRoomTypeById
} from '../controllers/room';

import { validationMiddleware } from '../middlewares/validation';
import { createRoomSchema, roomTypeSchema } from '../validation/room';
import { authenticate, checkIfIsAdmin } from '../middlewares/authenticate';
const router = express.Router();


//ADMIN
router.post('/rooms-types', authenticate, checkIfIsAdmin, validationMiddleware(roomTypeSchema), createRoomType);

router.get('/rooms-types', authenticate, checkIfIsAdmin, getRoomType);

router.delete('/delete-room-type/:roomTypeId', authenticate, checkIfIsAdmin, deleteRoomTypeById);

router.patch('/edit-room-type/:roomTypeId', authenticate, checkIfIsAdmin, updateRoomTypeById);

//GENERAL
router.get('/rooms', authenticate, getRoombySearchAndFilter);

router.post('/rooms', authenticate, validationMiddleware(createRoomSchema), createRoom);

router.patch('/rooms/:roomId', authenticate, updateRoomById);

router.delete('/rooms/:roomId', authenticate, deleteRoomById);

export default router;
