-- AlterTable
ALTER TABLE `product` MODIFY `description` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `VippsToken` (
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VippsToken_token_key`(`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
