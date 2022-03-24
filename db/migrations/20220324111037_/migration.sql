/*
  Warnings:

  - You are about to drop the column `thounsand` on the `wallets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "thounsand",
ADD COLUMN     "thousand" INTEGER NOT NULL DEFAULT 0;
