-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_credit_card_id_fkey";

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit-cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
