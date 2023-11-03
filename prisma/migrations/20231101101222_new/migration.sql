/*
  Warnings:

  - The primary key for the `Youtube` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Youtube" DROP CONSTRAINT "Youtube_pkey",
ALTER COLUMN "youtube_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Youtube_pkey" PRIMARY KEY ("youtube_id");
