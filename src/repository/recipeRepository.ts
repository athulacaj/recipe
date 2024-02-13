import { Ingredient, Prisma, PrismaClient, PrismaPromise, Recipe } from '@prisma/client';
import { IngredientFilterType } from '../utils/types/recipeFilterTypes';
const prisma = new PrismaClient();



class RecipeRepository {
    async getAllRecipe(whereObj?:Prisma.RecipeWhereInput,includeObj?:Prisma.RecipeInclude,skip?:number,limit?:number): Promise<Array<Recipe>> {
        return prisma.recipe.findMany(
            {
                include: includeObj,
                where: whereObj,
                skip: skip,
                take: limit,
            }
        );
    }

    async getRecipeFromIngredients(whereObj?:Prisma.IngredientWhereInput,includeObj?:Prisma.IngredientInclude): Promise<Array<Ingredient>> {
        return  prisma.ingredient.findMany(
            {
                include:includeObj,
                where:whereObj
            }
        );
    }

    async addRecipe(recipe:Prisma.RecipeCreateInput): Promise<Recipe> {
        return  prisma.recipe.create({
            data:recipe
        })       
    }

    async addMainIngredient(mainIngredientList:Prisma.MainIngredientCreateManyInput | Prisma.MainIngredientCreateManyInput[]): Promise<Prisma.BatchPayload> {
        return  prisma.mainIngredient.createMany({
            data:mainIngredientList
        })   
    }
    
}

export default RecipeRepository;
