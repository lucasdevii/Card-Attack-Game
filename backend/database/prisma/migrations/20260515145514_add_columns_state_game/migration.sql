-- AlterTable
ALTER TABLE "match_players" ADD COLUMN     "is_winner" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "in_game" BOOLEAN NOT NULL DEFAULT true;
