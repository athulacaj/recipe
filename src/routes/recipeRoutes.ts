// src/routes/resourceRoutes.ts

import {json,Router, Request, Response } from 'express';
import RecipeController from '../controllers/recipeController';
import RecipeService from '../services/recipeService';
import { requestToHttpRequestMapper,requestToHttpResponseMapper } from '../utils/mapper/httpMapper';
import RecipeRepository from '../repository/recipeRepository';
import paginationMiddleware from '../middlewares/paginationMiddleware';

const router = Router();
const recipeController=new RecipeController(
  new RecipeService(new RecipeRepository())
);

router.use(json())


router.post('/api/getRecipes', async (req: Request, res: Response) => {
  const response=await recipeController.getAllrecipes(requestToHttpRequestMapper(req));
  res.status(response.statusCode).json(response.body);
});





router.post('/api/addrecipe', async(req: Request, res: Response) => {
  // Your API logic here
  const response=await recipeController.addRecipe(requestToHttpRequestMapper(req));
  res.status(response.statusCode).json(response.body);
});









export default router;
