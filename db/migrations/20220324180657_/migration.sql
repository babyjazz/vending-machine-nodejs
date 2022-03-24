/*
  Warnings:

  - You are about to drop the column `five_hundred` on the `available_coins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "available_coins" DROP COLUMN "five_hundred",
ADD COLUMN     "fivehundred" INTEGER NOT NULL DEFAULT 0;
