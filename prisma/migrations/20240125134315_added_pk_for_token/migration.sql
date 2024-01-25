/*
  Warnings:

  - The required column `id` was added to the `VippsToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `VippsToken_token_key` ON `vippstoken`;

-- AlterTable
ALTER TABLE `vippstoken` ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `token` TEXT NOT NULL,
    ADD PRIMARY KEY (`id`);
