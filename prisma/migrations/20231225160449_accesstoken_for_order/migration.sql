-- DropIndex
DROP INDEX `Product_sizeId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `paymentorder` ADD COLUMN `accessToken` VARCHAR(191) NULL,
    ADD COLUMN `expiresAt` VARCHAR(191) NULL;
