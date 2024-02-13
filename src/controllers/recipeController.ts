import RecipeService from "../services/recipeService";
import { requestToHttpResponseMapper } from "../utils/mapper/httpMapper";
import { HttpRequest, HttpResponse } from "../utils/types/serverTypes";
import {  RecipeType } from "../utils/types/recipeTypes";
import { RecipeTypeMapper, RecipeTypeArrayMapper, MainIngredientTypeMapper } from "../utils/mapper/recipeMapper";
import { RecipeFilterFilterType } from "../utils/types/recipeFilterTypes";
import { RecipeFilterFilterTypeMapper } from "../utils/mapper/recipeFilterMapper";
import { getJoiValidationErrorIfExists } from "../utils/functions/requestHandleFunction";

class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
  ) { }

  async getAllrecipes(req: HttpRequest): Promise<HttpResponse> {
    try {
      const body=req.body;
      const { error, value } = RecipeFilterFilterTypeMapper.validate(body);
      const validationErrorMsg=getJoiValidationErrorIfExists(error);
      if(validationErrorMsg)
        return requestToHttpResponseMapper(400,{msg:validationErrorMsg})
      const recipes=await this.recipeService.getAllRecipe(value);
      return requestToHttpResponseMapper(200,{data:recipes})
    } catch(e){
        console.log(e);
        return requestToHttpResponseMapper(400, { "msg": e});
    }
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
        const { error, value } = RecipeTypeArrayMapper.validate(body);
        recipeObj=value;
        errObj=error;
      }else{
        const { error, value } = RecipeTypeMapper.validate(body);
        errObj=error;
        recipeObj=value;
      }

      
      const validationErrorMsg=getJoiValidationErrorIfExists(errObj);
      if(validationErrorMsg){
        return requestToHttpResponseMapper(400,{msg:validationErrorMsg})
      }else{
        const {result,error}=await this.recipeService.addRecipe(recipeObj);
        if(result==null || result.length==0){
          return requestToHttpResponseMapper(400,{msg:"error",error})
        }else{
          return requestToHttpResponseMapper(200,{data:result,msg:"done",error})
        }
      }
    } catch(e){
        console.log(e);
        return requestToHttpResponseMapper(400, { "msg": "error" });
    }
  }

  async addMainIngredient(req: HttpRequest): Promise<HttpResponse> {
    try{
      const body=req.body;
      const { error, value } = MainIngredientTypeMapper.validate(body);
      const validationErrorMsg=getJoiValidationErrorIfExists(error);
      if(validationErrorMsg)
        return requestToHttpResponseMapper(400,{msg:validationErrorMsg})
      const {result: resultObj,error: errorObj}=await this.recipeService.addMainIngredient(value);
      if(errorObj)
        return requestToHttpResponseMapper(400,{msg:"succesfully added",data:errorObj})
      return requestToHttpResponseMapper(200,{msg:"succesfully added",data:resultObj})
    }catch(e){
      return requestToHttpResponseMapper(400, { "msg": e });
    }
  }
}


export default RecipeController;