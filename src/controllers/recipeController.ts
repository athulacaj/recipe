import RecipeService from "../services/recipeService";
import { requestToHttpResponseMapper } from "../utils/functions/httpMapper";
import { HttpRequest, HttpResponse } from "../utils/types/serverTypes";
import {  RecipeType } from "../utils/types/recipeTypes";
import { RecipeSchema, RecipeSchemaArray } from "../utils/functions/recipeMapper";
import { RecipeFilter } from "../utils/types/recipeFilterTypes";

class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
  ) { }

  async getAllrecipes(req: HttpRequest): Promise<HttpResponse> {
    console.log("req.query",req.query);
    try {
      // parse json
      var andJson;
      var orJson;
      try{
        andJson=JSON.parse(req.query.and??"{}");
      }catch(e){

      }
      console.log("andJson",andJson);
      const recipeFilter:RecipeFilter={
        and:andJson,
      };
      const recipes=await this.recipeService.getAllRecipe();
      return requestToHttpResponseMapper(200,{data:recipes})
    } catch(e){
        console.log(e);
    }
    return requestToHttpResponseMapper(500, { "msg": "error" });
  }


  async getRecipeFromIngredientList(req: HttpRequest): Promise<HttpResponse> {
    try {
      // const ingredientList = ["onion", "tomato"];
      const ingredientList=req.headers.ingredientList;
      const recipes= await this.recipeService.getRecipeFromIngredientList(ingredientList);
      console.log("recipes",recipes);
      return requestToHttpResponseMapper(200,{data:recipes})
    } catch(e){
        console.log(e);
    }
    return requestToHttpResponseMapper(500, { "msg": "error" });
  }

  async addRecipe(req: HttpRequest): Promise<HttpResponse> {
    try {
      const body=req.body;
      var recipeObj:RecipeType|RecipeType[];
      var errObj;
      if(Array.isArray(body)){
        const { error, value } = RecipeSchemaArray.validate(body);
        recipeObj=value;
        errObj=error;
      }else{
        const { error, value } = RecipeSchema.validate(body);
        errObj=error;
        recipeObj=value;
      }
      if(errObj){
        console.log("errObj",errObj);
        const errorMessages = errObj.details.map(detail => detail.message);
        console.error('Validation Error:', errorMessages);
        return requestToHttpResponseMapper(400,{msg:errorMessages.join(",")})
      }else{
        const [resultList,errorList]=await this.recipeService.addRecipe(recipeObj);
        if(resultList.length==0){
          return requestToHttpResponseMapper(400,{msg:"error",errorList})
        }else{
          return requestToHttpResponseMapper(200,{data:resultList,msg:"done",errorList})
        }
      }
    } catch(e){
        console.log(e);
        return requestToHttpResponseMapper(400, { "msg": "error" });
    }
  }
}


export default RecipeController;