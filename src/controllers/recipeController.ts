import RecipeService from "../services/recipeService";
import { makeHttpResponse } from "../utils/functions/httpFunctions";
import { HttpRequest, HttpResponse } from "../utils/types/serverTypes";

class RecipeController {
  constructor(
    private readonly RecipeService: RecipeService,
  ) { }

  async getAllrecipes(req: HttpRequest): Promise<HttpResponse> {
    try {
      const recipeId = req.params.id as string; // Use type assertion
      const page = parseInt(req.query.page as string) || 1; // Current page, default to 1 if not provided
      const perPage = parseInt(req.query.perPage as string) || 10; // Items per page, default to 10 if not provided
      // Calculate the start and end indices based on the pagination parameters
      const startIndex = (page - 1) * perPage;
      const endIndex = page * perPage;

      return makeHttpResponse(200,{recipes:[]})
    } catch {

    }
    return makeHttpResponse(500, { "msg": "error" });
  }
}


export default RecipeController;