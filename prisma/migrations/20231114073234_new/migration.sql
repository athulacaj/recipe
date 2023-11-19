/*
  Warnings:

  - You are about to drop the column `recipe_id` on the `Youtube` table. All the data in the column will be lost.
  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[recipeId]` on the table `Youtube` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipeId` to the `Youtube` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "Youtube" DROP CONSTRAINT "Youtube_recipe_id_fkey";

-- DropIndex
DROP INDEX "Youtube_recipe_id_key";

-- AlterTable
ALTER TABLE "Youtube" DROP COLUMN "recipe_id",
ADD COLUMN     "recipeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Ingredients";

-- DropTable
DROP TABLE "Recipes";

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT[],
    "tags" TEXT[],
    "mainIngredient" TEXT NOT NULL,
    "isVeg" BOOLEAN NOT NULL,
    "preparationTime" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "mainIngredientId" INTEGER NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "isOptional" BOOLEAN NOT NULL,
    "IngredientsCategory" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instruction" (
    "id" SERIAL NOT NULL,
    "timestamp" DOUBLE PRECISION NOT NULL,
    "step" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Instruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainIngredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MainIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MainIngredient_name_key" ON "MainIngredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Youtube_recipeId_key" ON "Youtube"("recipeId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_mainIngredientId_fkey" FOREIGN KEY ("mainIngredientId") REFERENCES "MainIngredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Youtube" ADD CONSTRAINT "Youtube_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
