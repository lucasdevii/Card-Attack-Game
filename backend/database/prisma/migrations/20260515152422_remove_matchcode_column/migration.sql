/*
  Warnings:

  - You are about to drop the column `match_code` on the `match_players` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "match_players_match_code_key";

-- AlterTable
ALTER TABLE "match_players" DROP COLUMN "match_code";
