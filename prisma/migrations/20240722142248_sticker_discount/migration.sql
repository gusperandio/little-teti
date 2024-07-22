/*
  Warnings:

  - Added the required column `discount` to the `sticker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sticker" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL;
