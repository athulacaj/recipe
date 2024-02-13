import { Ingredient, Prisma, Recipe } from "@prisma/client";
import RecipeRepository from "../repository/recipeRepository"
import { IngredientFilterType, RecipeFilterFilterType } from "../utils/types/recipeFilterTypes";
import { RecipeType } from "../utils/types/recipeTypes";
import { ServiceReturnType } from "../utils/types/serviceTypes";

class RecipeService {
   constructor(private readonly recipeRepository: RecipeRepository) { }
   async getAllRecipe(recipeFilter?: RecipeFilterFilterType): Promise<Array<Recipe>> {
      var whereObj: Prisma.RecipeWhereInput = {}
      if (recipeFilter != null) {
         if (recipeFilter.and) {
            const { mainIngredient, isVeg } = recipeFilter.and;
            if (mainIngredient) whereObj.mainIngredient = {
               contains: mainIngredient,
               mode: "insensitive"
            };
            if (isVeg) whereObj.isVeg = isVeg;
         }
      }
      console.log("mainIngredient", whereObj);
      var includeObj: Prisma.RecipeInclude = {
         ingredients: true,
         instructions: true,
         youtube: true
      };
      const recipes: Array<Recipe> = await this.recipeRepository.getAllRecipe(whereObj, includeObj);
      return recipes;
   }

   async getRecipeFromIngredientList(ingredientList:Array<string>): Promise<Array<Ingredient>> {
      var possibleRecipeIdList: Array<string> = [];
      var ingredients: Array<Ingredient> = [];
      for (let i = 0; i < ingredientList.length; i++) {
         const filter: IngredientFilterType = {
            name: ingredientList[i]
         };

         if (i != 0) {
            filter.recipeIdList = possibleRecipeIdList;
         }

         ingredients = await this.getRecipeFromIngredientFilter(filter, i == ingredientList.length - 1);
         possibleRecipeIdList = [];
         ingredients = ingredients.filter((ingredient) => {
            const isNotExist = possibleRecipeIdList.indexOf(ingredient.recipeId) == -1;
            if (isNotExist)
               possibleRecipeIdList.push(ingredient.recipeId);
            return isNotExist;
         });

      }
      // ingredients=  await this.recipeRepository.getRecipeFromIngredients({name:"beef",recipeIdList:['OIf8B1Qxb-I']});
      return ingredients;
   }

   async getRecipeFromIngredientFilter(filter: IngredientFilterType, inCludeRecipes: boolean): Promise<Array<Ingredient>> {
      var whereObj: Prisma.IngredientWhereInput = {}
      whereObj = {
         name: {
            contains: filter.name,
            mode: "insensitive"
         }
      }
      if (filter.recipeIdList && filter.recipeIdList.length > 0) {
         whereObj.recipeId = {
            in: filter.recipeIdList
         }
      }
      const includeObj: Prisma.IngredientInclude | Prisma.IngredientInclude[] = {
      }
      if (inCludeRecipes) {
         includeObj.recipe = {
            include: {
               ingredients: true
            }
         }
      }

      const ingredients: Array<Ingredient> = await this.recipeRepository.getRecipeFromIngredients(whereObj, includeObj);
      return ingredients;
   }

   async addRecipe(recipeObj:RecipeType[]|RecipeType): Promise<ServiceReturnType> {
      const tempRecipeList:RecipeType[]=recipeObj instanceof Array?recipeObj:[recipeObj];
      const recipeObjList:  Prisma.RecipeCreateInput[]=tempRecipeList.map((recipe)=> ({
         id: recipe.id,
         name: recipe.name,
         category: recipe.category,
         mainIngredient: recipe.mainIngredient,
         isVeg: recipe.isVeg,
         tags: recipe.tags,
         preparationTime: recipe.preparationTime,
         description: recipe.description,
         rating: recipe.rating,
         ingredients: {
             create: recipe.ingredients,
         },
         instructions: {
             create: recipe.instructions,
         },
         youtube:{
             create:recipe.youtube
         }
     }));

     const errorList:any=[];
     const resultList:Recipe[]=[];
     for(let i=0;i<recipeObjList.length;i++){
      const recipe=recipeObjList[i];
      await this.recipeRepository.addRecipe(recipe).then((res) => {
         console.log("res", res);
         resultList.push(res);
      }).catch((err) => {
         console.log("err from prisma", err);
         errorList.push({data:{name:recipe.name,index:i},msg:err.message,meta:err.meta});
      });
     }

      return {result:resultList,error:errorList};
   }

   async addMainIngredient(mainIngredientList: string[]): Promise<ServiceReturnType> {
      const mainIngredientObjList: Prisma.MainIngredientCreateManyInput[] = mainIngredientList.map((mainIngredient) => ({
         id: mainIngredient.toLowerCase(),
      }));
      var errorObj: Object|undefined;
      var resultObj: Object|undefined;
      await this.recipeRepository.addMainIngredient(mainIngredientObjList).then((res) => {
         console.log("res", res);
         resultObj = res;
      }).catch((err) => {
         console.log("err from prisma", err);
         errorObj={ msg: err.message, meta: err.meta };
      })
      return { result: resultObj,error: errorObj};
   }
}


export default RecipeService