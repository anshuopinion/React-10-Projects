"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ExampleSchema = new mongoose_1.Schema({
    name: { type: String },
    id: { type: String },
});
exports.default = (0, mongoose_1.model)("Example", ExampleSchema);
