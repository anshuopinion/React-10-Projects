"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyForgotMail = exports.sendForgotPasswordMail = exports.verifyUserMail = exports.sendVerificationMail = exports.signinUser = exports.signupUser = void 0;
var http_errors_1 = __importStar(require("http-errors"));
var User_1 = __importDefault(require("../model/User"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var nodemailer_1 = __importDefault(require("nodemailer"));
var signupUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, password, existingUser, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                existingUser = _b.sent();
                if (existingUser)
                    return [2 /*return*/, next((0, http_errors_1.default)(422, "Email Already Exist!"))];
                return [4 /*yield*/, bcrypt_1.default.hash(password, 8)];
            case 3:
                hashedPassword = _b.sent();
                user = new User_1.default({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                });
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                res.json({ message: "User Created" });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, next(http_errors_1.InternalServerError)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.signupUser = signupUser;
var signinUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isValidPassword, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(404, "User not Found!"))];
                if (!user.isUserVerified)
                    return [2 /*return*/, next((0, http_errors_1.default)(406, "User not Verified"))];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                isValidPassword = _b.sent();
                if (!isValidPassword)
                    return [2 /*return*/, next((0, http_errors_1.default)(401, "Not Valid Password!"))];
                token = jsonwebtoken_1.default.sign({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userId: user.id,
                }, config_1.JWT_KEY, {
                    expiresIn: "7d",
                });
                res.cookie("jwt", token);
                res.json({ firstName: user.firstName, lastName: user.lastName, token: token });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                return [2 /*return*/, next(http_errors_1.InternalServerError)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signinUser = signinUser;
var sendVerificationMail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, encryptedToken, jwtToken, info, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(404, "Email Not Valid!"))];
                if (user.isUserVerified)
                    return [2 /*return*/, next((0, http_errors_1.default)(406, "User already verified"))];
                return [4 /*yield*/, bcrypt_1.default.hash(user._id.toString(), 8)];
            case 3:
                encryptedToken = _a.sent();
                jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.JWT_KEY, {
                    expiresIn: "60m",
                });
                return [4 /*yield*/, config_1.transporter.sendMail({
                        from: '"Fred Foo 👻" <anshuraj@dosomecoding.com>',
                        to: "".concat(email),
                        subject: "For Email Verification",
                        // text: "Hello world?", // plain text body
                        html: "Your Verification Link <a href=\"".concat(config_1.FRONTEND_URL, "/email-verify/").concat(jwtToken, "\">Link</a>"), // html body
                    })];
            case 4:
                info = _a.sent();
                // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                return [4 /*yield*/, user.updateOne({ $set: { verifyToken: encryptedToken } })];
            case 5:
                // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                _a.sent();
                res.json({
                    message: "Preview URL: %s ".concat(nodemailer_1.default.getTestMessageUrl(info)),
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, next(http_errors_1.InternalServerError)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.sendVerificationMail = sendVerificationMail;
var verifyUserMail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedToken, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_KEY);
                return [4 /*yield*/, User_1.default.findById(decodedToken.userId)];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(401, "Token Invalid"))];
                return [4 /*yield*/, user.updateOne({
                        $set: { isUserVerified: true },
                        $unset: { verifyToken: 0 },
                    })];
            case 3:
                _a.sent();
                res.json({ message: "Email Verified!" });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                return [2 /*return*/, next((0, http_errors_1.default)(401, "Token Invalid"))];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.verifyUserMail = verifyUserMail;
var sendForgotPasswordMail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, encryptedToken, jwtToken, info, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(404, "Email Not Valid!"))];
                return [4 /*yield*/, bcrypt_1.default.hash(user._id.toString(), 8)];
            case 3:
                encryptedToken = _a.sent();
                jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.JWT_KEY, {
                    expiresIn: "60m",
                });
                return [4 /*yield*/, config_1.transporter.sendMail({
                        from: '"Fred Foo 👻" <anshuraj@dosomecoding.com>',
                        to: "".concat(email),
                        subject: "For Forgot Password Verification Mail",
                        // text: "Hello world?", // plain text body
                        html: "Your Verification for forgot password Link <a href=\"".concat(config_1.FRONTEND_URL, "/forgot-password-verify/").concat(jwtToken, "\">Link</a>"), // html body
                    })];
            case 4:
                info = _a.sent();
                // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                return [4 /*yield*/, user.updateOne({ $set: { verifyToken: encryptedToken } })];
            case 5:
                // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                _a.sent();
                res.json({
                    message: "Preview URL: %s ".concat(nodemailer_1.default.getTestMessageUrl(info)),
                });
                return [3 /*break*/, 7];
            case 6:
                error_5 = _a.sent();
                return [2 /*return*/, next(http_errors_1.InternalServerError)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.sendForgotPasswordMail = sendForgotPasswordMail;
var verifyForgotMail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, password, decodedToken, user, encryptedPassword, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, token = _a.token, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_KEY);
                return [4 /*yield*/, User_1.default.findById(decodedToken.userId)];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(401, "Token Invalid"))];
                return [4 /*yield*/, bcrypt_1.default.hash(password, 8)];
            case 3:
                encryptedPassword = _b.sent();
                return [4 /*yield*/, user.updateOne({
                        $set: { password: encryptedPassword },
                        $unset: { verifyToken: 0 },
                    })];
            case 4:
                _b.sent();
                res.json({ message: "Password Changed!" });
                return [3 /*break*/, 6];
            case 5:
                error_6 = _b.sent();
                return [2 /*return*/, next((0, http_errors_1.default)(401, "Token Invalid"))];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.verifyForgotMail = verifyForgotMail;
