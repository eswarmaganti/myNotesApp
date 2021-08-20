import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

//@desc    Auth User & get Token
//@route    POST /api/user/login
//@access   public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
      bio: user.bio,
      location: user.location,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@desc     GET user Profile
//@route    GET /api/users/profile
//@access   private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc     POSt Register User
//@route    POST /api/user
//@access   public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json(`User Registration Successful for ${email}`);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

//@desc     POSt Update User password
//@route    POST /api/user/updatePass/:id
//@access   private
export const updateUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { password, newPassword } = req.body;
  const user = await User.findOne({ email: req.user.email });

  if (user && (await user.matchPassword(password))) {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(newPassword, salt);
    const userUpdated = await User.findByIdAndUpdate(id, {
      password: hashedPwd,
    });

    if (userUpdated) {
      res
        .status(200)
        .json(`Password updated request for ${req.user.email} success!!`);
    } else {
      throw new Error("Unable to update password, please try again alter!!");
    }
  } else {
    throw new Error(`Invalid Password for ${req.user.email}`);
  }
});

//@desc     POSt Update User Profile
//@route    POST /api/user/updateProfile/:id
//@access   private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, password, bio, location } = req.body;

  const user = await User.findOne({ email: req.user.email });

  if (user && (await user.matchPassword(password))) {
    const userUpdated = await User.findByIdAndUpdate(id, {
      name,
      bio,
      location,
    });

    if (userUpdated) {
      res
        .status(200)
        .json(`Profile updated request for ${req.user.email} success!!`);
    } else {
      throw new Error("Unable to update profile, please try again alter!!");
    }
  } else {
    throw new Error(`Invalid Password for ${req.user.email}`);
  }
});

//@desc     POSt Get Verification Code
//@route    POST /api/user/getVerificationCode
//@access   public
export const getVerificationCode = asyncHandler(async (req, res) => {
  const { email } = req.body;

  //validating email is entered ir not
  if (!email) {
    res.status(400);
    throw new Error("Email Address Required!!");
  } else {
    //check whether email id is registered or not
    const user = await User.findOne({ email });
    if (user) {
      //check whether verification code already generated
      const { _id } = user;
      const existedToken = await Token.findOne({ userId: _id });

      if (existedToken) {
        // if token already generated then send error response
        res.status(400);
        throw new Error(
          "Token already Generated please check your mail (spam folder)!!"
        );
      } else {
        // if token not generated then create a new One
        const tokenVal = String(Math.floor(Math.random() * 1000000));
        const token = await Token.create({
          userId: _id,
          token: tokenVal,
          email,
        });
        if (token) {
          res.status(201).send(token);
        } else {
          res.status(400);
          throw new Error(
            "Unable to Create Verification Code, try again later"
          );
        }
      }
    } else {
      //email not sent with request
      res.status(404);
      throw new Error("Email Address provided not registered");
    }
  }
});

//@desc     POSt Validate Verification Code
//@route    POST /api/user/validate
//@access   public
export const validateVerificationCode = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email Address Required!!");
  } else {
    const user = await User.findOne({ email });
    if (user) {
      const { _id } = user;

      const token = await Token.findOne({ userId: _id });

      if (token) {
        res.status(200).json(`Verification for ${email} is Success`);
      } else {
        res.status(404);
        throw new Error(
          "Invalid Verification Code Entered, please try with valid one"
        );
      }
    } else {
      res.status(404);
      throw new Error("Email Address not Registered!!");
    }
  }
});

//@desc     POSt Reset User Password
//@route    POST /api/user/resetPassword
//@access   public
export const resetPassword = asyncHandler(async (req, res) => {});