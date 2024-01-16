-- DropForeignKey
ALTER TABLE `productsonpaymentorder` DROP FOREIGN KEY `ProductsOnPaymentOrder_productId_fkey`;

-- AddForeignKey
ALTER TABLE `ProductsOnPaymentOrder` ADD CONSTRAINT `ProductsOnPaymentOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Stock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
