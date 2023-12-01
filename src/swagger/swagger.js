"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var options = {
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
    apis: ['src/routes/*.ts', 'src/swagger/schema/*', 'src/swagger/routes/*.yaml', 'src/swagger/example/*.yaml'], // Specify the path to your route handling files
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
