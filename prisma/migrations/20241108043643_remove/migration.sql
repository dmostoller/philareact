/*
  Warnings:

  - You are about to drop the column `authorImage` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorImage` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorImage";

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "authorImage";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";
