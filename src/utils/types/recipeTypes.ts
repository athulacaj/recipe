import Joi from "joi";

interface YoutubeType{
    id: string;
    name: string;
    language: string;
    country: string;
}


interface IngredientType{
    id?: number;
    name: string;
    quantity: string;
    isOptional: boolean;
    IngredientsCategory: string;
    recipeId?: string;
    recipe: RecipeType;
}


interface InstructionType{
    id?: number;
    timestamp: number;
    step: string;
    recipeId?: string;
    recipe: RecipeType;
}


interface MainIngredientType{
    id: string;
}


interface RecipeType{
    id: string;
    name: string;
    category: string[];
    tags: string[];
    mainIngredient: string;
    isVeg: boolean;
    preparationTime: number;
    description: string;
    youtube: YoutubeType;
    ingredients: IngredientType[];
    instructions: InstructionType[];
    rating: number;
}



export  {RecipeType,IngredientType,InstructionType,MainIngredientType,YoutubeType}
