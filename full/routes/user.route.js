import express from 'express';
import {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
  uploadResume,
  uploadProfileImage,
  updateUser,
  getAllUsersForAdmin,
  adminUpdateUser,
  adminDeleteUser

} from '../controllers/user.controller.js';
import { upload } from '../middlewares/upload.middleware.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { authenticateAdmin } from '../middlewares/admin.middleware.js';
import User from '../models/user.model.js'; // ✅ Required for admin routes

const router = express.Router();

router.get('/user', getUsers);
router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/upload-resume', upload.single('resume'), uploadResume);
router.put('/update-user/:id', authenticateToken, updateUser);
router.post('/upload-profile', upload.single('image'), uploadProfileImage);

router.get('/admin/users', authenticateAdmin, getAllUsersForAdmin);
router.put('/admin/update-user/:id', authenticateAdmin, adminUpdateUser);
router.get('/admin/users', authenticateAdmin, getAllUsersForAdmin);
router.put('/admin/update-user/:id', authenticateAdmin, adminUpdateUser);
router.delete('/admin/delete-user/:id', authenticateAdmin, adminDeleteUser);

export default router;