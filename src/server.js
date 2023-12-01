"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_1 = __importDefault(require("./swagger/swagger")); // Import your Swagger configuration
var recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes")); // Import your route handling file
var authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Import your route handling file
var config_1 = __importDefault(require("./config"));
var recipeGraphController_1 = __importDefault(require("./graphql/recipeGraphController")); // Import your route handling file
exports.app = (0, express_1.default)();
var port = 3000;
config_1.default.init();
console.log(config_1.default.databaseUrl);
// Use the route handling file
exports.app.use(recipeRoutes_1.default);
exports.app.use(authRoutes_1.default);
exports.app.use(recipeGraphController_1.default);
// Serve Swagger documentation
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Start the server
exports.app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
