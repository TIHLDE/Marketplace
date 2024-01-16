/*
  Warnings:

  - A unique constraint covering the columns `[payment_url]` on the table `PaymentOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `paymentorder` MODIFY `payment_url` VARCHAR(500) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PaymentOrder_payment_url_key` ON `PaymentOrder`(`payment_url`);
