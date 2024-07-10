/*
  Warnings:

  - You are about to drop the column `name_tag` on the `tags` table. All the data in the column will be lost.
  - Added the required column `tagName` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tags" DROP COLUMN "name_tag",
ADD COLUMN     "tagName" TEXT NOT NULL;
