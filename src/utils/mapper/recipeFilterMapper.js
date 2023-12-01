"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeFilterFilterTypeMapper = void 0;
var joi_1 = __importDefault(require("joi"));
var RecipeFilterFilterTypeMapper = joi_1.default.object({
    and: joi_1.default.object({
        mainIngredient: joi_1.default.string(),
        isVeg: joi_1.default.boolean(),
    }),
    or: joi_1.default.object({
        mainIngredient: joi_1.default.string(),
        isVeg: joi_1.default.boolean(),
    }),
});
exports.RecipeFilterFilterTypeMapper = RecipeFilterFilterTypeMapper;
