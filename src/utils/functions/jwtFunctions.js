"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeJwtToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../../config"));
function makeJwtToken(payload, expiresIn) {
    if (expiresIn === void 0) { expiresIn = '1h'; }
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: expiresIn });
}
exports.makeJwtToken = makeJwtToken;
