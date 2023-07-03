import Joi from "joi";

export const userSchema = {
  signupUser: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  signinUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  sendVerificationMail: Joi.object({
    email: Joi.string().email().required(),
  }),
  verifyUserMail: Joi.object({
    token: Joi.string().required(),
  }),
  sendForgotPasswordMail: Joi.object({
    email: Joi.string().email().required(),
  }),
  verifyForgotMail: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
