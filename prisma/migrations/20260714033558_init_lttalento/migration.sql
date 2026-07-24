/*
  Warnings:

  - You are about to drop the column `headline` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `personalData` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Candidate` table. All the data in the column will be lost.
  - The `preferences` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `skills` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `userId` on the `CandidateAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CandidateDocuments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CandidateEducation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CandidateExperience` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CandidatePersonal` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CandidatePreferences` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidateId]` on the table `CandidateAvailability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[candidateId]` on the table `CandidateDocuments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[candidateId]` on the table `CandidateEducation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[candidateId]` on the table `CandidateExperience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[candidateId]` on the table `CandidatePersonal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[candidateId]` on the table `CandidatePreferences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `candidateId` to the `CandidateAvailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidateId` to the `CandidateDocuments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidateId` to the `CandidateEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidateId` to the `CandidateExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidateId` to the `CandidatePersonal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidateId` to the `CandidatePreferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CandidateAvailability" DROP CONSTRAINT "CandidateAvailability_userId_fkey";

-- DropForeignKey
ALTER TABLE "CandidateDocuments" DROP CONSTRAINT "CandidateDocuments_userId_fkey";

-- DropForeignKey
ALTER TABLE "CandidateEducation" DROP CONSTRAINT "CandidateEducation_userId_fkey";

-- DropForeignKey
ALTER TABLE "CandidateExperience" DROP CONSTRAINT "CandidateExperience_userId_fkey";

-- DropForeignKey
ALTER TABLE "CandidatePersonal" DROP CONSTRAINT "CandidatePersonal_userId_fkey";

-- DropForeignKey
ALTER TABLE "CandidatePreferences" DROP CONSTRAINT "CandidatePreferences_userId_fkey";

-- DropIndex
DROP INDEX "CandidateAvailability_userId_key";

-- DropIndex
DROP INDEX "CandidateDocuments_userId_key";

-- DropIndex
DROP INDEX "CandidateEducation_userId_key";

-- DropIndex
DROP INDEX "CandidateExperience_userId_key";

-- DropIndex
DROP INDEX "CandidatePersonal_userId_key";

-- DropIndex
DROP INDEX "CandidatePreferences_userId_key";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "headline",
DROP COLUMN "personalData",
DROP COLUMN "status",
DROP COLUMN "summary",
ADD COLUMN     "availability" JSONB,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "cvUrl" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "languages" JSONB,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT,
DROP COLUMN "preferences",
ADD COLUMN     "preferences" JSONB,
DROP COLUMN "skills",
ADD COLUMN     "skills" JSONB;

-- AlterTable
ALTER TABLE "CandidateAvailability" DROP COLUMN "userId",
ADD COLUMN     "candidateId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CandidateDocuments" DROP COLUMN "userId",
ADD COLUMN     "candidateId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CandidateEducation" DROP COLUMN "userId",
ADD COLUMN     "candidateId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CandidateExperience" DROP COLUMN "userId",
ADD COLUMN     "candidateId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CandidatePersonal" DROP COLUMN "userId",
ADD COLUMN     "candidateId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CandidatePreferences" DROP COLUMN "userId",
ADD COLUMN     "candidateId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CandidateAvailability_candidateId_key" ON "CandidateAvailability"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateDocuments_candidateId_key" ON "CandidateDocuments"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateEducation_candidateId_key" ON "CandidateEducation"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateExperience_candidateId_key" ON "CandidateExperience"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidatePersonal_candidateId_key" ON "CandidatePersonal"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidatePreferences_candidateId_key" ON "CandidatePreferences"("candidateId");

-- AddForeignKey
ALTER TABLE "CandidatePersonal" ADD CONSTRAINT "CandidatePersonal_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateExperience" ADD CONSTRAINT "CandidateExperience_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateEducation" ADD CONSTRAINT "CandidateEducation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatePreferences" ADD CONSTRAINT "CandidatePreferences_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateAvailability" ADD CONSTRAINT "CandidateAvailability_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateDocuments" ADD CONSTRAINT "CandidateDocuments_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
