import RecipeService from "../services/recipeService";
import { makeHttpResponse } from "../utils/functions/httpFunctions";
import { HttpResponse } from "../utils/types/httpTypes";

class RecipeController {
   constructor(
    private readonly RecipeService: RecipeService,
   ){}
  
    async getAllrecipes():Promise<HttpResponse>{
      try{

      }catch{

      }
      return makeHttpResponse(500,{"msg":"error"});
    }
  }
  

export default RecipeController;