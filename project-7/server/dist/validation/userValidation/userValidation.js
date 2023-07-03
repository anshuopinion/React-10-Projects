"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyForgotMailValidation = exports.sendForgotPasswordMailValidation = exports.verifyUserMailValidation = exports.sendVerificationMailValidation = exports.signinUserValidation = exports.signupUserValidation = void 0;
var validator_1 = __importDefault(require("../utils/validator"));
var userSchema_1 = require("./userSchema");
var signupUserValidation = function (req, res, next) {
    return (0, validator_1.default)(userSchema_1.userSchema.signupUser, req.body, next);
};
exports.signupUserValidation = signupUserValidation;
var signinUserValidation = function (req, res, next) {
    return (0, validator_1.default)(userSchema_1.userSchema.signinUser, req.body, next);
};
exports.signinUserValidation = signinUserValidation;
var sendVerificationMailValidation = function (req, res, next) { return (0, validator_1.default)(userSchema_1.userSchema.sendVerificationMail, req.body, next); };
exports.sendVerificationMailValidation = sendVerificationMailValidation;
var verifyUserMailValidation = function (req, res, next) {
    return (0, validator_1.default)(userSchema_1.userSchema.verifyUserMail, req.body, next);
};
exports.verifyUserMailValidation = verifyUserMailValidation;
var sendForgotPasswordMailValidation = function (req, res, next) { return (0, validator_1.default)(userSchema_1.userSchema.sendForgotPasswordMail, req.body, next); };
exports.sendForgotPasswordMailValidation = sendForgotPasswordMailValidation;
var verifyForgotMailValidation = function (req, res, next) {
    return (0, validator_1.default)(userSchema_1.userSchema.verifyForgotMail, req.body, next);
};
exports.verifyForgotMailValidation = verifyForgotMailValidation;
