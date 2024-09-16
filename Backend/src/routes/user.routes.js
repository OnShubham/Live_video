import { Router } from 'express';
import {
  registerUser,
  UserLogin,
  logout,
  refreshAccessToken,
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer,middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/register').post(
  // middleware to work on get a data and upload in a Cloudnary
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    },
    {
      name: 'coverImage',
      maxCount: 1,
    },
  ]),
  //   register controllers
  registerUser
);

router.route('/login').post(UserLogin);
router.route('/logout').post(verifyJWT, logout);
router.route('/refresh-token').post(refreshAccessToken);
export default router;
