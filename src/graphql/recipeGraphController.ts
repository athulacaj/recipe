import { PrismaClient } from '@prisma/client';
import  express, { Router,Request,Response,NextFunction }  from 'express';
import { graphqlHTTP } from 'express-graphql';
var { buildSchema } = require("graphql")
import RecipeRepository from '../repository/recipeRepository';

const prisma = new PrismaClient();
const router = Router();

const recipeRepository =new RecipeRepository();

// https://graphql.org/graphql-js/mutations-and-input-types/
const typeDefs =buildSchema(`
  type Ingredient {
    name: String
    recipe_id:String
  }

  type Recipe {
    recipe_id: String
    name: String
    instructions:String 
    category:[String]
    main_ingredient:String
    is_veg:Boolean
    Ingredients:[Ingredient]
  }

  type Query {
    allRecipes(page: Int, limit: Int): [Recipe!]!
    getRecipeFromIngredientList(ingredientList:[String]):[Ingredient!]!
  }
  type Mutation {
    addRecipe(name: String!): Recipe!
  }
`);

const resolvers= {
  allRecipes: (parent:any,{ page = 0, limit = 10 }) => {
    return recipeRepository.getAllRecipe({},{ingredients:true},page*limit,limit);
  },
  addRecipe: async ({name}:any,req:AuthRequest) => {
    console.log("name ",name);
    console.log("req ",req.user);
    return {"recipe_id":'2323434sa'};
  }

};


interface AuthRequest extends Request {
  user?: any;
}
const authenticateJWT = (req:AuthRequest, res:Response, next:NextFunction) => {
  req.user={name:"test"};
  next();
};

router.use(authenticateJWT);
router.use(
  "/graphql",
  graphqlHTTP({
    schema: typeDefs,
    rootValue:resolvers,
    graphiql: true
  })
)


export default router;

