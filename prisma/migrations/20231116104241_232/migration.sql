/*
  Warnings:

  - The primary key for the `Youtube` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `youtube_id` on the `Youtube` table. All the data in the column will be lost.
  - Added the required column `id` to the `Youtube` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Youtube" DROP CONSTRAINT "Youtube_pkey",
DROP COLUMN "youtube_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Youtube_pkey" PRIMARY KEY ("id");
