/*
  Warnings:

  - You are about to alter the column `amount` on the `charges` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "charges" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
