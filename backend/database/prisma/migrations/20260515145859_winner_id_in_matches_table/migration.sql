/*
  Warnings:

  - You are about to drop the column `is_winner` on the `match_players` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "match_players" DROP COLUMN "is_winner";

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "winner" INTEGER;
