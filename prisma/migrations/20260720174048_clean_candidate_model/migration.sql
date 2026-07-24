/*
  Warnings:

  - You are about to drop the column `email` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `CandidatePersonal` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CandidatePersonal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "CandidatePersonal" DROP COLUMN "email",
DROP COLUMN "name";
