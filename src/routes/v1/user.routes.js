import express from 'express';
import { createUser, getUser } from '../../controllers/user.controller';

const router = express.Router();

// Route to create a new user

router.post('/', createUser);

// Route to get user by id

router.get('/:id', getUser);

export default router;
