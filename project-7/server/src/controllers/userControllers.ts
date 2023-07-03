import { RequestHandler } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FRONTEND_URL, JWT_KEY, transporter } from "../config";
import nodemailer from "nodemailer";
export const signupUser: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(422, "Email Already Exist!"));

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User Created" });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User not Found!"));
    if (!user.isUserVerified)
      return next(createHttpError(406, "User not Verified"));

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return next(createHttpError(401, "Not Valid Password!"));

    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user.id,
      },
      JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token);

    res.json({ firstName: user.firstName, lastName: user.lastName, token });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const sendVerificationMail: RequestHandler = async (req, res, next) => {
  const { email }: { email: string } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "Email Not Valid!"));

    if (user.isUserVerified)
      return next(createHttpError(406, "User already verified"));

    const encryptedToken = await bcrypt.hash(user._id.toString(), 8);

    const jwtToken = jwt.sign({ userId: user._id }, JWT_KEY, {
      expiresIn: "60m",
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <anshuraj@dosomecoding.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "For Email Verification", // Subject line
      // text: "Hello world?", // plain text body
      html: `Your Verification Link <a href="${FRONTEND_URL}/email-verify/${jwtToken}">Link</a>`, // html body
    });

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    await user.updateOne({ $set: { verifyToken: encryptedToken } });
    res.json({
      message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`,
    });
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};

export const verifyUserMail: RequestHandler = async (req, res, next) => {
  const { token }: { token: string } = req.body;

  try {
    const decodedToken: any = jwt.verify(token, JWT_KEY);

    const user = await User.findById(decodedToken.userId);
    if (!user) return next(createHttpError(401, "Token Invalid"));

    await user.updateOne({
      $set: { isUserVerified: true },
      $unset: { verifyToken: 0 },
    });

    res.json({ message: "Email Verified!" });
  } catch (error) {
    return next(createHttpError(401, "Token Invalid"));
  }
};

export const sendForgotPasswordMail: RequestHandler = async (
  req,
  res,
  next
) => {
  const { email }: { email: string } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "Email Not Valid!"));

    const encryptedToken = await bcrypt.hash(user._id.toString(), 8);

    const jwtToken = jwt.sign({ userId: user._id }, JWT_KEY, {
      expiresIn: "60m",
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <anshuraj@dosomecoding.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "For Forgot Password Verification Mail", // Subject line
      // text: "Hello world?", // plain text body
      html: `Your Verification for forgot password Link <a href="${FRONTEND_URL}/forgot-password-verify/${jwtToken}">Link</a>`, // html body
    });

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    await user.updateOne({ $set: { verifyToken: encryptedToken } });

    res.json({
      message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`,
    });
  } catch (error) {
    return next(InternalServerError);
  }
};
export const verifyForgotMail: RequestHandler = async (req, res, next) => {
  const { token, password }: { token: string; password: string } = req.body;

  try {
    const decodedToken: any = jwt.verify(token, JWT_KEY);

    const user = await User.findById(decodedToken.userId);
    if (!user) return next(createHttpError(401, "Token Invalid"));

    const encryptedPassword = await bcrypt.hash(password, 8);

    await user.updateOne({
      $set: { password: encryptedPassword },
      $unset: { verifyToken: 0 },
    });

    res.json({ message: "Password Changed!" });
  } catch (error) {
    return next(createHttpError(401, "Token Invalid"));
  }
};
