/*
  Warnings:

  - Added the required column `quantity` to the `orderedBooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderedBooks" ADD COLUMN     "quantity" INTEGER NOT NULL;
