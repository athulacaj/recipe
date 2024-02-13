import Joi from "joi";
import { IngredientType, InstructionType, RecipeType, YoutubeType } from "../types/recipeTypes";


const YoutubeTypeMapper = Joi.object<YoutubeType>({
    id: Joi.string().required(),
    name: Joi.string().required(),
    language: Joi.string().required(),
    country: Joi.string(),
});

const IngredientTypeMapper = Joi.object<IngredientType>({
    id: Joi.number(),
    name: Joi.string().required(),
    quantity: Joi.string().required().allow(""),
    isOptional: Joi.boolean().required(),
    ingredientCategory: Joi.string().required(),
    recipeId: Joi.string(),
}).required();


const InstructionTypeMapper = Joi.object<InstructionType>({
    id: Joi.number(),
    timestamp: Joi.number().required(),
    step: Joi.string().required(),
    recipeId: Joi.string(),
}).required();


const RecipeTypeMapper = Joi.object<RecipeType>({
    id: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.array().items(Joi.string()).required(),
    tags: Joi.array().items(Joi.string()).required(),
    mainIngredient: Joi.string().required(),
    isVeg: Joi.boolean().required(),
    preparationTime: Joi.number().required(),
    description: Joi.string().required(),
    youtube: YoutubeTypeMapper,
    ingredients: Joi.array().items(IngredientTypeMapper).required(),
    instructions: Joi.array().items(InstructionTypeMapper).required(),
    rating: Joi.number().required(),
});

const RecipeTypeArrayMapper = Joi.array().items(RecipeTypeMapper.required()).required();
const MainIngredientTypeMapper = Joi.array().items(Joi.string()).required();

export { RecipeTypeArrayMapper, RecipeTypeMapper, InstructionTypeMapper, IngredientTypeMapper, YoutubeTypeMapper, MainIngredientTypeMapper, };