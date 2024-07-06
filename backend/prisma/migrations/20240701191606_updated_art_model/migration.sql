/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Art` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `Art` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Art` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Art" DROP CONSTRAINT "Art_usersId_fkey";

-- AlterTable
ALTER TABLE "Art" DROP COLUMN "isDeleted",
DROP COLUMN "usersId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
