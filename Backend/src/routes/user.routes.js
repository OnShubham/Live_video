import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer,middleware.js';
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

export default router;
