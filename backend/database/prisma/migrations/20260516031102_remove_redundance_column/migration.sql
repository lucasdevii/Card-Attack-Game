/*
  Warnings:

  - The values [IN_GAME] on the enum `userStates` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `in_game` on the `matches` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "userStates_new" AS ENUM ('OFFLINE', 'ONLINE', 'SEARCHING', 'PLAYING');
ALTER TABLE "public"."users" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "status" TYPE "userStates_new" USING ("status"::text::"userStates_new");
ALTER TYPE "userStates" RENAME TO "userStates_old";
ALTER TYPE "userStates_new" RENAME TO "userStates";
DROP TYPE "public"."userStates_old";
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'OFFLINE';
COMMIT;

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "in_game";
