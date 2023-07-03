"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.exampleSchema = {
    getExampleData: joi_1.default.object({
        name: joi_1.default.string().required(),
        id: joi_1.default.number().required(),
    }),
};
