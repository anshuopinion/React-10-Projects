"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
var passport_1 = __importDefault(require("passport"));
exports.authChecker = passport_1.default.authenticate("jwt", { session: false });
