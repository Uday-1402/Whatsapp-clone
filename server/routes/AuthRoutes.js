
import {Router} from 'express';
import { checkUser, onboardUser,getAllUsers } from '../controllers/AuthController.js';

const router = Router();

router.post('/check-user',checkUser);
router.post('/onboard-user',onboardUser);
router.get('/get-contacts',getAllUsers);

export default router;