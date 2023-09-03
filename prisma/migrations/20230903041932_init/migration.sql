/*
  Warnings:

  - You are about to drop the `orderedBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderedBooks" DROP CONSTRAINT "orderedBooks_bookId_fkey";

-- DropForeignKey
ALTER TABLE "orderedBooks" DROP CONSTRAINT "orderedBooks_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderedBooks" JSONB[];

-- DropTable
DROP TABLE "orderedBooks";
