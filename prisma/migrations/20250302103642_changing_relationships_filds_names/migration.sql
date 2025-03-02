/*
  Warnings:

  - You are about to drop the column `userId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "userId",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "userId",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
