import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudnary } from '../utils/cloudnary.js';
import { ApiResponse } from '../utils/ApiRes.js';

const generateAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const AccessToken = user.generateAccessToken;
    const RefreshToken = user.refreshAccessToken;

    user.RefreshToken = RefreshToken;
    await user.save({
      validateBeforeSave: false,
    });
    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(500, 'Something Errorn');
  }
};

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

  // Check if any required field is missing or empty
  if ([username, email, fullname, password].some((field) => !field?.trim())) {
    throw new ApiError(400, 'All fields are required');
  }

  // Check if a user with the same username or email already exists
  const existingUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User with this email or username already exists');
  }

  // Check for uploaded avatar and cover image files
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  // Ensure avatar is uploaded (it's mandatory)
  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar is mandatory');
  }

  // Upload avatar and cover image to Cloudinary
  const avatar = await uploadOnCloudnary(avatarLocalPath);
  const coverImage = coverLocalPath
    ? await uploadOnCloudnary(coverLocalPath)
    : null;

  // Create a new user in the database
  const newUser = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
  });

  // Retrieve the created user, omitting password and refreshToken from the response
  const userResponse = await User.findById(newUser._id).select(
    '-password -refreshToken'
  );

  if (!userResponse) {
    throw new ApiError(500, 'An error occurred while creating the user');
  }

  // Return success response
  return res
    .status(201)
    .json(new ApiResponse(201, userResponse, 'User registered successfully'));
});

const UserLogin = asyncHandler(async (req, res) => {
  // todo userLogin
  // check the email are store in db store then next step
  // find the user ?
  // check the password and password incode ? other wise  login
  // access and reress token
  // send cookie a secure
  //  response success full login

  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, 'Username or email is required');
  }

  // Query user by email or username
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Verify password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, 'Password is incorrect');
  }

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save the refresh token to the user
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Remove sensitive fields from the response
  const userResponse = await User.findById(user._id).select('-password -refreshToken');

  // Set cookies for tokens
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: userResponse,
          accessToken,
          refreshToken,
        },
        'User Login Success'
      )
    );
});


const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        RefreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('AccessToken', options)
    .clearCookie('RefreshToken', options)
    .json(new ApiResponse(200, {}, 'User Logout'));
});

export { registerUser, UserLogin, logout };
