/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LineManager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Admin`;

-- DropTable
DROP TABLE `LineManager`;

-- CreateTable
CREATE TABLE `Claims` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `approved` BOOLEAN NOT NULL,
    `rejected` BOOLEAN NOT NULL,
    `employeeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Employee_email_idx` ON `Employee`(`email`);

-- AddForeignKey
ALTER TABLE `Claims` ADD CONSTRAINT `Claims_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
