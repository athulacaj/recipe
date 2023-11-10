import { Ingredients, Prisma, PrismaClient, PrismaPromise, Recipes } from '@prisma/client';
import { IngredientFilter } from '../utils/types/recipeFilterTypes';
const prisma = new PrismaClient();



class RecipeRepository {
    async getAllRecipe(whereObj?:Prisma.RecipesWhereInput,includeObj?:Prisma.RecipesInclude ): Promise<Array<Recipes>> {
        const recipes = prisma.recipes.findMany(
            {
                include: includeObj,
                where: whereObj,
                skip: 0,
                take: 100,
            }
        );
        return recipes;
    }

    async getRecipeFromIngredients(whereObj?:Prisma.IngredientsWhereInput,includeObj?:Prisma.IngredientsInclude): Promise<Array<Ingredients>> {
        const ingredients = prisma.ingredients.findMany(
            {
                include:includeObj,
                where:whereObj
            }
        );
        return ingredients;

    }
}

export default RecipeRepository;
