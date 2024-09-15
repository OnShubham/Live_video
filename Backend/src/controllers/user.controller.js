import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

import { User } from '../models/user.models.js';
import { uploadOnCloudnary } from '../utils/cloudnary.js';
import { ApiResponse } from '../utils/ApiRes.js';
const registerUser = asyncHandler(async (req, res) => {
  //   res.status(200).json({
  //     message: 'ok',
  //   });
  // get the user detis in a frontend
  // validation data not empty
  // check if user already exists
  // check for image and check for avtar
  // then upload forn cloudnary , avtart
  //   create user object - create entry in db
  //   remove the pass and refresh token filelsd form resonse
  //  check userr creation
  // return the response

  const { username, email, fullname, password } = req.body;

  if (
    [username, email, fullname, password].some((data) => data?.trim() === '')
  ) {
    throw new ApiError(400, 'All filds are required');
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, 'User with email or username already rexits');
  }
  console.log(existedUser);

  // multer used
  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverLocalImage = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avtar is mandtry');
  }

  const avatar = await uploadOnCloudnary(avatarLocalPath);
  const coverImage = await uploadOnCloudnary(coverLocalImage);

  if (!avatar) {
    throw new ApiError(400, 'Avtar is mandtry');
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage.url || '',
    email,
    password,
    username: username.toLowerCase(),
  });

  const findByID = User.findById(user._id).select('-password -refrencToken');

  if (!findByID) {
    throw new ApiError(500, 'something error check it in backend');
  }

  return res
    .status(201)
    .json(new ApiResponse(200, findByID, 'User Register Succesfully '));
});

export { registerUser };
