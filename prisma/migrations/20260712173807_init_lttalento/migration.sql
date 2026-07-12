/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `headline` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `seniority` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Candidate` table. All the data in the column will be lost.
  - The `status` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `candidateId` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Evaluation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_candidateId_fkey";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "createdAt",
DROP COLUMN "education",
DROP COLUMN "experience",
DROP COLUMN "headline",
DROP COLUMN "languages",
DROP COLUMN "location",
DROP COLUMN "phone",
DROP COLUMN "preferences",
DROP COLUMN "seniority",
DROP COLUMN "skills",
DROP COLUMN "summary",
DROP COLUMN "updatedAt",
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pendiente';

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "candidateId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "role",
DROP COLUMN "updatedAt",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zone" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "Evaluation";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "Skill";

-- DropEnum
DROP TYPE "CandidateStatus";

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "field" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "description" TEXT,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPreference" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "desiredRole" TEXT,
    "desiredSalary" INTEGER,
    "workMode" TEXT,
    "travelAvailability" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "JobPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "fullTime" BOOLEAN NOT NULL DEFAULT false,
    "partTime" BOOLEAN NOT NULL DEFAULT false,
    "weekends" BOOLEAN NOT NULL DEFAULT false,
    "immediate" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobPreference_candidateId_key" ON "JobPreference"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Availability_candidateId_key" ON "Availability"("candidateId");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPreference" ADD CONSTRAINT "JobPreference_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
