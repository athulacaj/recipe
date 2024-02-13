
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "My API",
      "version": "1.0.0",
      "description": "API documentation for My API"
    },
    "servers": [
      {
        "url": "http://localhost:3000"
      }
    ],
    "paths": {
      "/api/emailLogin": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Login with email and password",
          "description": "Returns a User object",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmailLogin"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": null
            }
          }
        }
      },
      "/api/signup": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Signup with email and password",
          "description": "Returns a User object",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Signup"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": null
            }
          }
        }
      },
      "/api/getRecipes": {
        "post": {
          "tags": [
            "Recipes"
          ],
          "summary": "Get a list of recipes",
          "description": "Returns a list of resources.",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RecipeFilter"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A list of resources"
            }
          }
        }
      },
      "/api/addrecipe": {
        "post": {
          "tags": [
            "Recipes"
          ],
          "summary": "Create a new recipe",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Recipe"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Recipe created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Recipe"
                  },
                  "examples": {
                    "PepperChickenRoast": {
                      "$ref": "#/components/examples/PepperChickenRoast"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "EmailLogin": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          }
        },
        "Signup": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          }
        },
        "Recipe": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "category": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "tags": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "mainIngredient": {
              "type": "string"
            },
            "ingredients": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Ingredient"
              }
            },
            "instructions": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Instruction"
              }
            },
            "isVeg": {
              "type": "boolean"
            },
            "preparationTime": {
              "type": "integer"
            },
            "description": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "rating": {
              "type": "integer"
            },
            "youtube": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "id": {
                  "type": "string"
                },
                "language": {
                  "type": "string"
                },
                "country": {
                  "type": "string"
                }
              }
            }
          }
        },
        "Ingredient": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "quantity": {
              "type": "string"
            },
            "isOptional": {
              "type": "boolean"
            },
            "IngredientsCategory": {
              "type": "string"
            }
          }
        },
        "Instruction": {
          "type": "object",
          "properties": {
            "timestamp": {
              "type": "number"
            },
            "step": {
              "type": "string"
            }
          }
        },
        "RecipeFilter": {
          "type": "object",
          "properties": {
            "and": {
              "type": "object",
              "properties": {
                "mainIngredient": {
                  "type": "string"
                },
                "isVeg": {
                  "type": "boolean"
                }
              }
            }
          }
        }
      },
      "examples": {
        "PepperChickenRoast": {
          "value": {
            "name": "Pepper Chicken Roast",
            "category": [
              "Main Course",
              "Chicken"
            ],
            "tags": [
              "Spicy",
              "Restaurant-style",
              "Indian Cuisine"
            ],
            "mainIngredient": "Chicken",
            "ingredients": [
              {
                "name": "Onion",
                "quantity": "4 thin slices",
                "isOptional": false,
                "IngredientsCategory": "Vegetables"
              },
              {
                "name": "Curry Leaves",
                "quantity": "6 stems",
                "isOptional": false,
                "IngredientsCategory": "Herbs"
              }
            ],
            "instructions": [
              {
                "timestamp": 88.676,
                "step": "Marinate the chicken with Kashmiri chilly powder, salt, turmeric, and ginger-garlic paste. Rest for 30 minutes."
              },
              {
                "timestamp": 111.318,
                "step": "Roast coriander seeds, peppercorns, and dry red chilies. Crush the roasted spices coarsely."
              }
            ],
            "isVeg": false,
            "preparationTime": 60,
            "description": "Pepper chicken roast, a flavorful Indian-style dish, is a tasty, spicy chicken roast resembling the restaurant-quality flavor.",
            "id": "yZ809bnDqRI",
            "rating": 416,
            "youtube": {
              "name": "Easy Pepper Chicken Roast Recipe Malaylam | Restaurant style Spicy pepper chicken recipe.",
              "id": "yZ809bnDqRI",
              "language": "malayalam",
              "country": "india"
            }
          }
        }
      }
    },
    "tags": []
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
