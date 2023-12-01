"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authService_1 = __importDefault(require("../services/authService"));
var authRepository_1 = __importDefault(require("../repository/authRepository"));
var authController_1 = __importDefault(require("../controllers/authController"));
var router = (0, express_1.Router)();
var authService = new authService_1.default(new authRepository_1.default());
var authController = new authController_1.default(authService);
router.post('/api/emailLogin', function (req, res) {
    console.log("email login", req.body);
    authController.login(req).then(function (response) {
        res.status(response.statusCode).json(response.body);
    });
});
router.post('/api/signup', function (req, res) {
    authController.signup(req).then(function (response) {
        res.status(response.statusCode).json(response.body);
    });
});
exports.default = router;
