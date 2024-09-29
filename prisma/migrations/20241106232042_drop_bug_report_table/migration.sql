/*
  Warnings:

  - Added the required column `actual` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `browser` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expected` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `os` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `severity` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steps` to the `BugReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
DROP TABLE "BugReport";