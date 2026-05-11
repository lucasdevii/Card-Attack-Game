-- CreateEnum
CREATE TYPE "userStates" AS ENUM ('OFFLINE', 'ONLINE', 'SEARCHING', 'IN_GAME');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "userStates" NOT NULL DEFAULT 'OFFLINE';
