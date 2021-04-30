/*
  Warnings:

  - You are about to drop the column `body` on the `ContentHistory` table. All the data in the column will be lost.
  - Added the required column `bodyMarkdown` to the `ContentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContentHistory" DROP COLUMN "body",
ADD COLUMN     "bodyMarkdown" TEXT NOT NULL;
