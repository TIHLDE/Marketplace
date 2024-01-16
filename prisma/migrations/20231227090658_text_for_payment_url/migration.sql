-- DropIndex
DROP INDEX `PaymentOrder_payment_url_key` ON `paymentorder`;

-- AlterTable
ALTER TABLE `paymentorder` MODIFY `payment_url` TEXT NOT NULL;
