import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger'; // Import your Swagger configuration
import recipeRoutes from './routes/recipeRoutes'; // Import your route handling file
// import demoRoutes from './swagger/models/recipe'; // Import your route handling file

const app: Application = express();
const port: number = 3000;

// Use the route handling file
app.use(recipeRoutes);
// app.use(demoRoutes);


// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
