/*
  Warnings:

  - You are about to drop the column `tagName` on the `category` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "tagName",
ADD COLUMN     "categoryName" TEXT NOT NULL;
