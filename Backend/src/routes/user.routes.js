import { Router } from 'express';
import {
  registerUser,
  UserLogin,
  logout,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountHandler,
  updateUserAvatar,
  updateCoverImages,
  getUserChanaels,
  getWatchHistory,
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
router.route('/forget-pasword').post(verifyJWT, changeCurrentPassword),
  router.route('/curent-user').get(verifyJWT, getCurrentUser),
  router
    .route('/update-account-details')
    .patch(verifyJWT, updateAccountHandler),
  router
    .route('/update-avatar')
    .patch(verifyJWT, upload.single('avatar'), updateUserAvatar);

router
  .route('/cover-image')
  .patch(verifyJWT, upload.single('coverImage'), updateCoverImages);

router.route('/c/:username').get(verifyJWT, getUserChanaels);
router.route('/watchHistory').get(verifyJWT, getWatchHistory);

export default router;
