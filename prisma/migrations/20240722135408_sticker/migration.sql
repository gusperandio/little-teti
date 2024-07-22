/*
  Warnings:

  - Added the required column `description` to the `sticker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `userSticker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sticker" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userSticker" ADD COLUMN     "amount" INTEGER NOT NULL;
