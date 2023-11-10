// src/routes/resourceRoutes.ts

import { Router, Request, Response } from 'express';
import RecipeController from '../controllers/recipeController';
import RecipeService from '../services/recipeService';
import { makeHttpRequest } from '../utils/functions/httpFunctions';
import RecipeRepository from '../repository/recipeRepository';
import paginationMiddleware from '../middlewares/paginationMiddleware';

const router = Router();
const recipeController=new RecipeController(
  new RecipeService(new RecipeRepository())
);

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     tags:
 *      - Recipes
 *     summary: Get a list of recipes
 *     description: Returns a list of resources.
 *     responses:
 *       200:
 *         description: A list of resources
 */
router.get('/api/recipes',paginationMiddleware, async (req: Request, res: Response) => {
  const response=await recipeController.getAllrecipes(makeHttpRequest(req));
  res.status(response.statusCode).json(response.body);
});



/**
 * @swagger
 * /api/recipes:
 *   post:
 *     tags:
 *       - Recipes
 *     summary: Create a new recipe
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Recipe"
 *     responses:
 *       '200':
 *         description: Recipe created successfully
 * 
 */

router.post('/api/recipe', (req: Request, res: Response) => {
  // Your API logic here
  res.json({ resources: [] });
});







export default router;
