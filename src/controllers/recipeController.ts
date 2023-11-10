import RecipeService from "../services/recipeService";
import { makeHttpResponse } from "../utils/functions/httpFunctions";
import { HttpRequest, HttpResponse } from "../utils/types/serverTypes";
import RecipeRepository from "../repository/recipeRepository"

class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
  ) { }

  async getAllrecipes(req: HttpRequest): Promise<HttpResponse> {
    try {
      
      const skip= parseInt(req.query.skip as string) || 0;
      const take=parseInt(req.query.take as string) || 10;

      // const recipes=await this.recipeService.getAllRecipe(recipeFilter);
      const ingredientList = ["onion", "tomato"];
      const recipes= await this.recipeService.getRecipeFromIngredientList(ingredientList);
      console.log("recipes",recipes);

      return makeHttpResponse(200,{recipes:recipes})
    } catch(e){
        console.log(e);
    }
    return makeHttpResponse(500, { "msg": "error" });
  }
}


export default RecipeController;