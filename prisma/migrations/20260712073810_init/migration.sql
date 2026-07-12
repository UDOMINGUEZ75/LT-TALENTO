/*
  Warnings:

  - You are about to drop the column `applicationId` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `evaluatorId` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `strengths` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `weaknesses` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the `AIProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Insight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterviewGuide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recruiter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TalentMap` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `candidateId` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Made the column `score` on table `Evaluation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "AIProfile" DROP CONSTRAINT "AIProfile_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_evaluatorId_fkey";

-- DropForeignKey
ALTER TABLE "Insight" DROP CONSTRAINT "Insight_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewGuide" DROP CONSTRAINT "InterviewGuide_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_recruiterId_fkey";

-- DropForeignKey
ALTER TABLE "Recruiter" DROP CONSTRAINT "Recruiter_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Recruiter" DROP CONSTRAINT "Recruiter_userId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "TalentMap" DROP CONSTRAINT "TalentMap_candidateId_fkey";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "languages" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "preferences" TEXT,
ADD COLUMN     "seniority" TEXT,
ADD COLUMN     "status" "CandidateStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "skills" DROP NOT NULL,
ALTER COLUMN "skills" SET DATA TYPE TEXT,
ALTER COLUMN "headline" DROP NOT NULL,
ALTER COLUMN "summary" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "applicationId",
DROP COLUMN "data",
DROP COLUMN "evaluatorId",
DROP COLUMN "strengths",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
DROP COLUMN "weaknesses",
ADD COLUMN     "candidateId" INTEGER NOT NULL,
ALTER COLUMN "score" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "AIProfile";

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Insight";

-- DropTable
DROP TABLE "InterviewGuide";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "Recruiter";

-- DropTable
DROP TABLE "Score";

-- DropTable
DROP TABLE "TalentMap";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- DropEnum
DROP TYPE "EvaluationType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
