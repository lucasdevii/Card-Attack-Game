/*
  Warnings:

  - You are about to drop the column `life` on the `match_players` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "match_players" DROP COLUMN "life";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "life" INTEGER NOT NULL DEFAULT 100;
