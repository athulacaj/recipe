"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var RecipeService = /** @class */ (function () {
    function RecipeService(recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
    RecipeService.prototype.getAllRecipe = function (recipeFilter) {
        return __awaiter(this, void 0, void 0, function () {
            var whereObj, _a, mainIngredient, isVeg, includeObj, recipes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        whereObj = {};
                        if (recipeFilter != null) {
                            if (recipeFilter.and) {
                                _a = recipeFilter.and, mainIngredient = _a.mainIngredient, isVeg = _a.isVeg;
                                if (mainIngredient)
                                    whereObj.mainIngredient = {
                                        contains: mainIngredient,
                                        mode: "insensitive"
                                    };
                                if (isVeg)
                                    whereObj.isVeg = isVeg;
                            }
                        }
                        console.log("mainIngredient", whereObj);
                        includeObj = {
                            ingredients: true,
                            instructions: true,
                            youtube: true
                        };
                        return [4 /*yield*/, this.recipeRepository.getAllRecipe(whereObj, includeObj)];
                    case 1:
                        recipes = _b.sent();
                        return [2 /*return*/, recipes];
                }
            });
        });
    };
    RecipeService.prototype.getRecipeFromIngredientList = function (ingredientList) {
        return __awaiter(this, void 0, void 0, function () {
            var possibleRecipeIdList, ingredients, i, filter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        possibleRecipeIdList = [];
                        ingredients = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < ingredientList.length)) return [3 /*break*/, 4];
                        filter = {
                            name: ingredientList[i]
                        };
                        if (i != 0) {
                            filter.recipeIdList = possibleRecipeIdList;
                        }
                        return [4 /*yield*/, this.getRecipeFromIngredientFilter(filter, i == ingredientList.length - 1)];
                    case 2:
                        ingredients = _a.sent();
                        possibleRecipeIdList = [];
                        ingredients = ingredients.filter(function (ingredient) {
                            var isNotExist = possibleRecipeIdList.indexOf(ingredient.recipeId) == -1;
                            if (isNotExist)
                                possibleRecipeIdList.push(ingredient.recipeId);
                            return isNotExist;
                        });
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: 
                    // ingredients=  await this.recipeRepository.getRecipeFromIngredients({name:"beef",recipeIdList:['OIf8B1Qxb-I']});
                    return [2 /*return*/, ingredients];
                }
            });
        });
    };
    RecipeService.prototype.getRecipeFromIngredientFilter = function (filter, inCludeRecipes) {
        return __awaiter(this, void 0, void 0, function () {
            var whereObj, includeObj, ingredients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        whereObj = {};
                        whereObj = {
                            name: {
                                contains: filter.name,
                                mode: "insensitive"
                            }
                        };
                        if (filter.recipeIdList && filter.recipeIdList.length > 0) {
                            whereObj.recipeId = {
                                in: filter.recipeIdList
                            };
                        }
                        includeObj = {};
                        if (inCludeRecipes) {
                            includeObj.recipe = {
                                include: {
                                    ingredients: true
                                }
                            };
                        }
                        return [4 /*yield*/, this.recipeRepository.getRecipeFromIngredients(whereObj, includeObj)];
                    case 1:
                        ingredients = _a.sent();
                        return [2 /*return*/, ingredients];
                }
            });
        });
    };
    RecipeService.prototype.addRecipe = function (recipeObj) {
        return __awaiter(this, void 0, void 0, function () {
            var tempRecipeList, recipeObjList, errorList, resultList, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempRecipeList = recipeObj instanceof Array ? recipeObj : [recipeObj];
                        recipeObjList = tempRecipeList.map(function (recipe) { return ({
                            id: recipe.id,
                            name: recipe.name,
                            category: recipe.category,
                            mainIngredient: recipe.mainIngredient,
                            isVeg: recipe.isVeg,
                            tags: recipe.tags,
                            preparationTime: recipe.preparationTime,
                            description: recipe.description,
                            rating: recipe.rating,
                            ingredients: {
                                create: recipe.ingredients,
                            },
                            instructions: {
                                create: recipe.instructions,
                            },
                            youtube: {
                                create: recipe.youtube
                            }
                        }); });
                        errorList = [];
                        resultList = [];
                        _loop_1 = function (i) {
                            var recipe;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        recipe = recipeObjList[i];
                                        return [4 /*yield*/, this_1.recipeRepository.addRecipe(recipe).then(function (res) {
                                                console.log("res", res);
                                                resultList.push(res);
                                            }).catch(function (err) {
                                                console.log("err from prisma", err);
                                                errorList.push({ data: { name: recipe.name, index: i }, msg: err.message, meta: err.meta });
                                            })];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < recipeObjList.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, { result: resultList, error: errorList }];
                }
            });
        });
    };
    RecipeService.prototype.addMainIngredient = function (mainIngredientList) {
        return __awaiter(this, void 0, void 0, function () {
            var mainIngredientObjList, errorObj, resultObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainIngredientObjList = mainIngredientList.map(function (mainIngredient) { return ({
                            id: mainIngredient.toLowerCase(),
                        }); });
                        return [4 /*yield*/, this.recipeRepository.addMainIngredient(mainIngredientObjList).then(function (res) {
                                console.log("res", res);
                                resultObj = res;
                            }).catch(function (err) {
                                console.log("err from prisma", err);
                                errorObj = { msg: err.message, meta: err.meta };
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { result: resultObj, error: errorObj }];
                }
            });
        });
    };
    return RecipeService;
}());
exports.default = RecipeService;
