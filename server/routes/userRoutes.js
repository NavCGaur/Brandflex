import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Route to verify Firebase token
router.get('/', userController.getAllUsers);
router.get('/:id',userController.getUserById)
router.post('/',userController.createUser);
router.put('/:id',userController.editUser);
router.delete('/:id',userController.deleteUser);



export default router;
