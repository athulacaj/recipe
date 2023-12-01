"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainIngredientTypeMapper = exports.YoutubeTypeMapper = exports.IngredientTypeMapper = exports.InstructionTypeMapper = exports.RecipeTypeMapper = exports.RecipeTypeArrayMapper = void 0;
var joi_1 = __importDefault(require("joi"));
var YoutubeTypeMapper = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    language: joi_1.default.string().required(),
    country: joi_1.default.string(),
});
exports.YoutubeTypeMapper = YoutubeTypeMapper;
var IngredientTypeMapper = joi_1.default.object({
    id: joi_1.default.number(),
    name: joi_1.default.string().required(),
    quantity: joi_1.default.string().required().allow(""),
    isOptional: joi_1.default.boolean().required(),
    ingredientCategory: joi_1.default.string().required(),
    recipeId: joi_1.default.string(),
}).required();
exports.IngredientTypeMapper = IngredientTypeMapper;
var InstructionTypeMapper = joi_1.default.object({
    id: joi_1.default.number(),
    timestamp: joi_1.default.number().required(),
    step: joi_1.default.string().required(),
    recipeId: joi_1.default.string(),
}).required();
exports.InstructionTypeMapper = InstructionTypeMapper;
var RecipeTypeMapper = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    category: joi_1.default.array().items(joi_1.default.string()).required(),
    tags: joi_1.default.array().items(joi_1.default.string()).required(),
    mainIngredient: joi_1.default.string().required(),
    isVeg: joi_1.default.boolean().required(),
    preparationTime: joi_1.default.number().required(),
    description: joi_1.default.string().required(),
    youtube: YoutubeTypeMapper,
    ingredients: joi_1.default.array().items(IngredientTypeMapper).required(),
    instructions: joi_1.default.array().items(InstructionTypeMapper).required(),
    rating: joi_1.default.number().required(),
});
exports.RecipeTypeMapper = RecipeTypeMapper;
var RecipeTypeArrayMapper = joi_1.default.array().items(RecipeTypeMapper.required()).required();
exports.RecipeTypeArrayMapper = RecipeTypeArrayMapper;
var MainIngredientTypeMapper = joi_1.default.array().items(joi_1.default.string()).required();
exports.MainIngredientTypeMapper = MainIngredientTypeMapper;
