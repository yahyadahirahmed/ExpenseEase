/*
  Warnings:

  - Added the required column `filePath` to the `Claims` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Claims` ADD COLUMN `filePath` VARCHAR(191) NOT NULL;
