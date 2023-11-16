/*
  Warnings:

  - A unique constraint covering the columns `[user_id,card_name]` on the table `credit-cards` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "credit-cards_card_name_key";

-- DropIndex
DROP INDEX "credit-cards_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "credit-cards_user_id_card_name_key" ON "credit-cards"("user_id", "card_name");
