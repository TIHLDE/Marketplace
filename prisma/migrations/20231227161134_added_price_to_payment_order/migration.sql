/*
  Warnings:

  - Added the required column `total_price` to the `PaymentOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `paymentorder` ADD COLUMN `total_price` INTEGER NOT NULL;
