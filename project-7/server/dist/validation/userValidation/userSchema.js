"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.userSchema = {
    signupUser: joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
    signinUser: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
    sendVerificationMail: joi_1.default.object({
        email: joi_1.default.string().email().required(),
    }),
    verifyUserMail: joi_1.default.object({
        token: joi_1.default.string().required(),
    }),
    sendForgotPasswordMail: joi_1.default.object({
        email: joi_1.default.string().email().required(),
    }),
    verifyForgotMail: joi_1.default.object({
        token: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
};
