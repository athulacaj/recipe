// src/routes/resourceRoutes.ts

import express,{ Router, Request, Response } from 'express';
import RecipeController from '../controllers/recipeController';
import RecipeService from '../services/recipeService';
import { requestToHttpRequestMapper,requestToHttpResponseMapper } from '../utils/functions/httpMapper';
import RecipeRepository from '../repository/recipeRepository';
import paginationMiddleware from '../middlewares/paginationMiddleware';

const router = Router();
const recipeController=new RecipeController(
  new RecipeService(new RecipeRepository())
);

router.use(express.json())

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     tags:
 *      - Recipes
 *     summary: Get a list of recipes
 *     description: Returns a list of resources.
 *     parameters:
 *      - in: query
 *        name: and
 *     responses:
 *       200:
 *         description: A list of resources
 */
router.get('/api/recipes', async (req: Request, res: Response) => {
  const response=await recipeController.getAllrecipes(requestToHttpRequestMapper(req));
  res.status(response.statusCode).json(response.body);
});



/**
 * @swagger
 * /api/recipe:
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
 *         content:
 *          application/json:
 *           schema:
 *            $ref: "#/components/schemas/Recipe"
 *           examples:
 *            PepperChickenRoast:
 *              $ref: '#/components/examples/PepperChickenRoast'
 *       '400':
 *         description: Bad request
 * 
 */

router.post('/api/recipe', async(req: Request, res: Response) => {
  // Your API logic here
  const response=await recipeController.addRecipe(requestToHttpRequestMapper(req));
  res.status(response.statusCode).json(response.body);
});









export default router;
