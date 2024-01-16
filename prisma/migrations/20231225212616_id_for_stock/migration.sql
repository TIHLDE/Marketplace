/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Stock` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `stock` ADD COLUMN `id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Stock_id_key` ON `Stock`(`id`);
