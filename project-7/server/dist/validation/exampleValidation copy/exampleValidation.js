"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExampleDataValidation = void 0;
var validator_1 = __importDefault(require("../utils/validator"));
var exampleSchema_1 = require("./exampleSchema");
var getExampleDataValidation = function (req, res, next) {
    return (0, validator_1.default)(exampleSchema_1.exampleSchema.getExampleData, req.body, next);
};
exports.getExampleDataValidation = getExampleDataValidation;
