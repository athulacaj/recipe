/*
  Warnings:

  - The primary key for the `MainIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `MainIngredient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_mainIngredientId_fkey";

-- DropIndex
DROP INDEX "MainIngredient_name_key";

-- AlterTable
ALTER TABLE "MainIngredient" DROP CONSTRAINT "MainIngredient_pkey",
DROP COLUMN "name",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MainIngredient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MainIngredient_id_seq";
