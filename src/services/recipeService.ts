import { Ingredients, Prisma, Recipes } from "@prisma/client";
import RecipeRepository from "../repository/recipeRepository"
import { IngredientFilter, RecipeFilter } from "../utils/types/recipeFilterTypes";

class RecipeService {
   constructor(private readonly recipeRepository: RecipeRepository) { }
   async getAllRecipe(recipeFilter?: RecipeFilter): Promise<Array<Recipes>> {
      var whereObj: Prisma.RecipesWhereInput = {}
      if (recipeFilter != null) {
         if (recipeFilter.and) {
            const { mainIngredient, isVeg } = recipeFilter.and;
            if (mainIngredient) whereObj.main_ingredient = mainIngredient;
            if (isVeg) whereObj.is_veg = isVeg;
         }
      }
      var includeObj: Prisma.RecipesInclude = {
         Ingredients: true
      };
      const recipes: Array<Recipes> = await this.recipeRepository.getAllRecipe(whereObj, includeObj);
      return recipes;
   }

   async getRecipeFromIngredientList(ingredientList:Array<string>): Promise<Array<Ingredients>> {
      var possibleRecipeIdList: Array<string> = [];
      var ingredients: Array<Ingredients> = [];
      for (let i = 0; i < ingredientList.length; i++) {
         const filter: IngredientFilter = {
            name: ingredientList[i]
         };

         if (i != 0) {
            filter.recipeIdList = possibleRecipeIdList;
         }

         ingredients = await this.getRecipeFromIngredientFilter(filter, i == ingredientList.length - 1);
         possibleRecipeIdList = [];
         ingredients = ingredients.filter((ingredient) => {
            const isNotExist = possibleRecipeIdList.indexOf(ingredient.recipe_id) == -1;
            if (isNotExist)
               possibleRecipeIdList.push(ingredient.recipe_id);
            return isNotExist;
         });

      }
      // ingredients=  await this.recipeRepository.getRecipeFromIngredients({name:"beef",recipeIdList:['OIf8B1Qxb-I']});
      return ingredients;
   }

   async getRecipeFromIngredientFilter(filter: IngredientFilter, inCludeRecipes: boolean): Promise<Array<Ingredients>> {
      var whereObj: Prisma.IngredientsWhereInput = {}
      whereObj = {
         name: {
            contains: filter.name,
            mode: "insensitive"
         }
      }
      if (filter.recipeIdList && filter.recipeIdList.length > 0) {
         whereObj.recipe_id = {
            in: filter.recipeIdList
         }
      }
      const includeObj: Prisma.IngredientsInclude | Prisma.IngredientsInclude[] = {
      }
      if (inCludeRecipes) {
         includeObj.Recipes = {
            include: {
               Ingredients: true
            }
         }
      }

      const ingredients: Array<Ingredients> = await this.recipeRepository.getRecipeFromIngredients(whereObj, includeObj);
      return ingredients;
   }
}


export default RecipeService