"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var httpMapper_1 = require("../utils/mapper/httpMapper");
var recipeMapper_1 = require("../utils/mapper/recipeMapper");
var recipeFilterMapper_1 = require("../utils/mapper/recipeFilterMapper");
var requestHandleFunction_1 = require("../utils/functions/requestHandleFunction");
var RecipeController = /** @class */ (function () {
    function RecipeController(recipeService) {
        this.recipeService = recipeService;
    }
    RecipeController.prototype.getAllrecipes = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, error, value, validationErrorMsg, recipes, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        body = req.body;
                        _a = recipeFilterMapper_1.RecipeFilterFilterTypeMapper.validate(body), error = _a.error, value = _a.value;
                        validationErrorMsg = (0, requestHandleFunction_1.getJoiValidationErrorIfExists)(error);
                        if (validationErrorMsg)
                            return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(400, { msg: validationErrorMsg })];
                        return [4 /*yield*/, this.recipeService.getAllRecipe(value)];
                    case 1:
                        recipes = _b.sent();
                        return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(200, { data: recipes })];
                    case 2:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(400, { "msg": e_1 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecipeController.prototype.getRecipeFromIngredientList = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var ingredientList, recipes, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ingredientList = req.headers.ingredientList;
                        return [4 /*yield*/, this.recipeService.getRecipeFromIngredientList(ingredientList)];
                    case 1:
                        recipes = _a.sent();
                        console.log("recipes", recipes);
                        return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(200, { data: recipes })];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(500, { "msg": "error" })];
                }
            });
        });
    };
    RecipeController.prototype.addRecipe = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var body, recipeObj, errObj, _a, error, value, _b, error, value, validationErrorMsg, _c, result, error, e_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        body = req.body;
                        if (Array.isArray(body)) {
                            _a = recipeMapper_1.RecipeTypeArrayMapper.validate(body), error = _a.error, value = _a.value;
                            recipeObj = value;
                            errObj = error;
                        }
                        else {
                            _b = recipeMapper_1.RecipeTypeMapper.validate(body), error = _b.error, value = _b.value;
                            errObj = error;
                            recipeObj = value;
                        }
                        validationErrorMsg = (0, requestHandleFunction_1.getJoiValidationErrorIfExists)(errObj);
                        if (!validationErrorMsg) return [3 /*break*/, 1];
                        return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(400, { msg: validationErrorMsg })];
                    case 1: return [4 /*yield*/, this.recipeService.addRecipe(recipeObj)];
                    case 2:
                        _c = _d.sent(), result = _c.result, error = _c.error;
                        if (result == null || result.length == 0) {
                            return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(400, { msg: "error", error: error })];
                        }
                        else {
                            return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(200, { data: result, msg: "done", error: error })];
                        }
                        _d.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_3 = _d.sent();
                        console.log(e_3);
                        return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(400, { "msg": "error" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RecipeController.prototype.addMainIngredient = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, error, value, validationErrorMsg, _b, resultObj, errorObj, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        body = req.body;
                        _a = recipeMapper_1.MainIngredientTypeMapper.validate(body), error = _a.error, value = _a.value;
                        validationErrorMsg = (0, requestHandleFunction_1.getJoiValidationErrorIfExists)(error);
                        if (validationErrorMsg)
                            return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(400, { msg: validationErrorMsg })];
                        return [4 /*yield*/, this.recipeService.addMainIngredient(value)];
                    case 1:
                        _b = _c.sent(), resultObj = _b.result, errorObj = _b.error;
                        if (errorObj)
                            return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(400, { msg: "succesfully added", data: errorObj })];
                        return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(200, { msg: "succesfully added", data: resultObj })];
                    case 2:
                        e_4 = _c.sent();
                        return [2 /*return*/, (0, httpMapper_1.requestToHttpResponseMapper)(400, { "msg": e_4 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RecipeController;
}());
exports.default = RecipeController;
