/*
  Warnings:

  - The primary key for the `Recipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_veg` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main_ingredient` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `Recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipe_id_fkey";

-- AlterTable
ALTER TABLE "Recipes" DROP CONSTRAINT "Recipes_pkey",
DROP COLUMN "id",
ADD COLUMN     "category" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "is_veg" BOOLEAN NOT NULL,
ADD COLUMN     "main_ingredient" TEXT NOT NULL,
ADD COLUMN     "recipe_id" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "time" INTEGER NOT NULL,
ADD CONSTRAINT "Recipes_pkey" PRIMARY KEY ("recipe_id");

-- DropTable
DROP TABLE "Ingredient";

-- CreateTable
CREATE TABLE "Ingredients" (
    "ingredient_id" SERIAL NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("ingredient_id")
);

-- CreateTable
CREATE TABLE "Youtube" (
    "youtube_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "Youtube_pkey" PRIMARY KEY ("youtube_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Youtube_recipe_id_key" ON "Youtube"("recipe_id");

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Youtube" ADD CONSTRAINT "Youtube_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;
