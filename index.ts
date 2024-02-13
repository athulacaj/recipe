// import { PrismaClient } from '@prisma/client';
// import  express  from 'express';
// import { graphqlHTTP } from 'express-graphql';
// import { makeExecutableSchema } from '@graphql-tools/schema';

// const prisma = new PrismaClient();

// const typeDefs = `
//   type Recipe {
//     name: String
//     instructions:String
//   }

//   type Query {
//     allRecipes: [Recipe!]!
//   }
// `;

// const resolvers = {
//   Query: {
//     allRecipes: () => {
//       return prisma.recipes.findMany()
//     }
//   }
// };

// export const schema = makeExecutableSchema({
//   resolvers,
//   typeDefs,
// });

// const app = express();
// app.use('/graphql', graphqlHTTP({
//   schema,
// }));

// app.listen(4000,()=>{
//     console.log("server is running on port 4000");
// });