// src/routes/resourceRoutes.ts

import { Router, Request, Response } from 'express';

const router = Router();

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
router.get('/api/recipes', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1; // Current page, default to 1 if not provided
  const perPage = parseInt(req.query.perPage as string) || 10; // Items per page, default to 10 if not provided

  // Calculate the start and end indices based on the pagination parameters
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  
  res.json({ resources: [] });
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
 * components:
 *  schemas:
 *    Recipe:
 *      type: object
 *      properties:
 *          name:
 *            type: string
 * 
 */

router.post('/api/recipe', (req: Request, res: Response) => {
  // Your API logic here
  res.json({ resources: [] });
});







export default router;
