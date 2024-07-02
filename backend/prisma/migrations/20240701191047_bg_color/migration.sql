/*
  Warnings:

  - You are about to drop the column `artParams` on the `Art` table. All the data in the column will be lost.
  - Added the required column `bgColor` to the `Art` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Art" DROP COLUMN "artParams",
ADD COLUMN     "bgColor" TEXT NOT NULL;
