import Joi from "joi";
import { IngredientType, InstructionType, RecipeType, YoutubeType } from "../types/recipeTypes";


const YoutubeSchema= Joi.object<YoutubeType>({
    id: Joi.string().required(),
    name: Joi.string().required(),
    language: Joi.string().required(),
    country: Joi.string(),
});

const IngredientSchema = Joi.object<IngredientType>({
    id: Joi.number(),
    name: Joi.string().required(),
    quantity: Joi.string().required().allow(""),
    isOptional: Joi.boolean().required(),
    IngredientsCategory: Joi.string().required(),
    recipeId: Joi.string(),
}).required();


const InstructionSchema = Joi.object<InstructionType>({
    id: Joi.number(),
    timestamp: Joi.number().required(),
    step: Joi.string().required(),
    recipeId: Joi.string(),
}).required();


const RecipeSchema = Joi.object<RecipeType>({
    id: Joi.string().required(),
    name: Joi.string().required(),
     category: Joi.array().items(Joi.string()).required(),
     tags: Joi.array().items(Joi.string()).required(),
     mainIngredient: Joi.string().required(),
     isVeg: Joi.boolean().required(),
     preparationTime: Joi.number().required(),
     description: Joi.string().required(),
     youtube: YoutubeSchema,
     ingredients: Joi.array().items(IngredientSchema).required(),
     instructions: Joi.array().items(InstructionSchema).required(),
     rating: Joi.number().required(),
 });
 
 const RecipeSchemaArray = Joi.array().items(RecipeSchema.required()).required();
 

export {RecipeSchema,IngredientSchema,InstructionSchema,YoutubeSchema,RecipeSchemaArray}