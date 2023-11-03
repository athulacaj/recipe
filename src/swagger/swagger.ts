import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version (3.0.0 for Swagger 3.0)
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for My API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Specify the base URL of your API
      },
    ],
  },
  apis: ['src/routes/*.ts','src/swagger/schema/*','src/swagger/routes/*.yaml'], // Specify the path to your route handling files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
