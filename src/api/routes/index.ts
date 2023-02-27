import  express,{Router} from 'express';

import authRouter from './auth_route';
import  roomRouter  from './room_route';

const router:Router = express.Router();

router.use('/', roomRouter);
router.use('/auth', authRouter);

export default router;