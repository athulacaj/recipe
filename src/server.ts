import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger'; // Import your Swagger configuration
import recipeRoutes from './routes/recipeRoutes'; // Import your route handling file
import authRoutes from './routes/authRoutes'; // Import your route handling file
import config from './config';

import recipeGrapController from './graphql/recipeGraphController'; // Import your route handling file



export const app: Application = express();
const port: number = 3000;
config.init();
console.log(config.databaseUrl);


// Use the route handling file
app.use(recipeRoutes);
app.use(authRoutes);
app.use(recipeGrapController);


// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


