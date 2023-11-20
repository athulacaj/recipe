import Joi from "joi";
import { RecipeFilterFilterType } from "../types/recipeFilterTypes";

const RecipeFilterFilterTypeMapper = Joi.object<RecipeFilterFilterType>({
    and: Joi.object({
        mainIngredient: Joi.string(),
        isVeg: Joi.boolean(),
    }),
    or: Joi.object({
        mainIngredient: Joi.string(),
        isVeg: Joi.boolean(),
    }),
});

export { RecipeFilterFilterTypeMapper };