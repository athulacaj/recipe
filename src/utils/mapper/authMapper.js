"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSignupTypeMapper = exports.MobileLoginTypeMapper = exports.EmailLoginTypeMapper = void 0;
var joi_1 = __importDefault(require("joi"));
var EmailLoginTypeMapper = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.EmailLoginTypeMapper = EmailLoginTypeMapper;
var MobileLoginTypeMapper = joi_1.default.object({
    phone: joi_1.default.string().required()
});
exports.MobileLoginTypeMapper = MobileLoginTypeMapper;
var EmailSignupTypeMapper = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    name: joi_1.default.string().required()
});
exports.EmailSignupTypeMapper = EmailSignupTypeMapper;
