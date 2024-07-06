/*
  Warnings:

  - You are about to drop the `FeedPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeedPost" DROP CONSTRAINT "FeedPost_artId_fkey";

-- DropForeignKey
ALTER TABLE "FeedPost" DROP CONSTRAINT "FeedPost_userId_fkey";

-- DropTable
DROP TABLE "FeedPost";
