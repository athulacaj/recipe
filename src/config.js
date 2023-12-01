"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var config = {
    init: function () { return dotenv_1.default.config(); },
    databaseUrl: process.env.DATABASE_URL || 'default_database_url',
    jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};
exports.default = config;
