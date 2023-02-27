import express,{Router} from 'express';

import { signUp, signIn, deleteUser, getAllUser } from '../controllers/auth';
import { validationMiddleware } from '../middlewares/validation';
import { signinSchema, signupSchema } from '../validation/auth'
const router:Router = express.Router();

router.post('/sign-up', validationMiddleware(signupSchema), signUp);
router.post('/sign-in', validationMiddleware(signinSchema), signIn);
router.get('/get-users', getAllUser);
router.delete('/delete-user', deleteUser);

export default router;
