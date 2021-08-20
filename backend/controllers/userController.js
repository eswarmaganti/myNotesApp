import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { response } from "express";

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
      const existedToken = await Token.findOne({
        userId: _id,
        isVerified: false,
        isExpired: false,
      });

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
          // res.status(201).send(token);
          //* send email for the verification code.

          const transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verification Code for Reset Password",
            text:
              "You have received this email because you have requested for reset of your password for your account\n" +
              `Verification Code :- ${token.token}\n` +
              "the verification code is valid only for 10 minutes after you sent the request",
          };

          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.log(error);
              res.status(500);
              throw new Error(
                "Failed to sent Verification Code Email, please try later"
              );
            } else {
              console.log(response);
              res
                .status(200)
                .json(
                  `Verification code sent to ${email},Unable to find mail in Inbox, check spam`
                );
            }
          });
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
  const { email, token } = req.body;

  if (!email || !token) {
    res.status(400);
    throw new Error("Email Address / Token is  Required!!");
  } else {
    const user = await User.findOne({ email });
    if (user) {
      const { _id } = user;

      const tokenData = await Token.findOne({
        userId: _id,
        isExpired: false,
        isVerified: false,
      });

      if (tokenData) {
        // checking whether document is present or not
        if (!token.isExpired && !token.isVerified) {
          // checking token is not expired or verified

          if (tokenData.token === token) {
            // checking token is matched or not
            const updatedToken = await Token.findByIdAndUpdate(
              { _id: tokenData._id },
              { isVerified: true }
            );
            if (updatedToken) {
              res.status(200).json(`Verification for ${email} is Success`);
            } else {
              res.status(500);
              throw new Error(
                "Failed to Verify the Code, please try with valid one"
              );
            }
          } else {
            res.status(400);
            throw new Error(
              "Verification Code not matched, please try with valid one"
            );
          }
        } else {
          res.status(404);
          throw new Error(
            "Invalid Verification Code Entered, please try with valid one"
          );
        }
      } else {
        res.status(400);
        throw new Error("Verification Code is Expired, please try again later");
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
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email Address / Password is Required!!");
  } else {
    //check whether email is existed
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("user is not registered,Invalid request!!");
    } else {
      // check for the verified feild in token model
      const token = await Token.findOne({
        userId: user._id,
        isExpired: false,
        isVerified: true,
      });

      if (!token) {
        // if no token found for given email
        res.status(404);
        throw new Error(
          "no token is generated for your email,please try again later"
        );
      } else {
        // if token is not verified i.e, false then reset password
        if (token.isVerified) {
          //hash the new password
          const salt = await bcrypt.genSalt(10);
          const hashedPwd = await bcrypt.hash(password, salt);
          //update the user with new password
          const updateduser = await User.findByIdAndUpdate(
            { _id: user._id },
            {
              password: hashedPwd,
            }
          );
          if (updateduser) {
            //user update successful then expire the token
            const deletedToken = await Token.findByIdAndUpdate(
              {
                _id: token._id,
              },
              {
                isExpired: true,
              }
            );
            if (deletedToken) {
              // if token deletion successful , send the success response
              res.status(200).json(`Password Reset Successful for ${email}`);
            } else {
              // if token deletion failed, send failed response
              res.status(500);
              throw new Error(
                "Failed to Reset Password,Please try again later"
              );
            }
          } else {
            //if user is not updated, send the failed response
            res.status(500);
            throw new Error("Failed to Reset Password,Please try again later");
          }
        } else {
          // if token is already verified i.e, true then throw error
          res.status(400);
          throw new Error("Token is already verified,please try again later");
        }
      }
    }
  }
});
