-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'RECRUITER', 'CANDIDATE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CANDIDATE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "preferences" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pendiente',
    "skills" TEXT[],
    "headline" TEXT,
    "summary" TEXT,
    "experience" JSONB,
    "education" JSONB,
    "personalData" JSONB,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidatePersonal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zone" TEXT,
    "address" TEXT,
    "phone" TEXT,

    CONSTRAINT "CandidatePersonal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateExperience" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "company" TEXT,
    "position" TEXT,
    "years" INTEGER,
    "description" TEXT,

    CONSTRAINT "CandidateExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateEducation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "school" TEXT,
    "degree" TEXT,
    "graduationYear" INTEGER,

    CONSTRAINT "CandidateEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidatePreferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "area" TEXT,
    "salary" INTEGER,
    "modality" TEXT,

    CONSTRAINT "CandidatePreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateAvailability" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "schedule" TEXT,
    "travel" BOOLEAN,
    "relocate" BOOLEAN,

    CONSTRAINT "CandidateAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateDocuments" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cvUrl" TEXT,
    "ineUrl" TEXT,
    "proofUrl" TEXT,

    CONSTRAINT "CandidateDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recruiter" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "position" TEXT,
    "phone" TEXT,
    "companyId" INTEGER,

    CONSTRAINT "Recruiter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidateId" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recruiterId" INTEGER,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "userId" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_userId_key" ON "Candidate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidatePersonal_userId_key" ON "CandidatePersonal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateExperience_userId_key" ON "CandidateExperience"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateEducation_userId_key" ON "CandidateEducation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidatePreferences_userId_key" ON "CandidatePreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateAvailability_userId_key" ON "CandidateAvailability"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateDocuments_userId_key" ON "CandidateDocuments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Recruiter_userId_key" ON "Recruiter"("userId");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatePersonal" ADD CONSTRAINT "CandidatePersonal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Candidate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateExperience" ADD CONSTRAINT "CandidateExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Candidate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateEducation" ADD CONSTRAINT "CandidateEducation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Candidate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatePreferences" ADD CONSTRAINT "CandidatePreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Candidate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateAvailability" ADD CONSTRAINT "CandidateAvailability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Candidate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateDocuments" ADD CONSTRAINT "CandidateDocuments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Candidate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recruiter" ADD CONSTRAINT "Recruiter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
