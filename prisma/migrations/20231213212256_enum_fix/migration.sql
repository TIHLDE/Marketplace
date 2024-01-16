/*
  Warnings:

  - The values [RESERVE] on the enum `PaymentOrder_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `paymentorder` MODIFY `status` ENUM('INITIATE', 'RESERVED', 'CAPTURE', 'CANCEL', 'REFUND', 'SALE') NOT NULL DEFAULT 'INITIATE';
