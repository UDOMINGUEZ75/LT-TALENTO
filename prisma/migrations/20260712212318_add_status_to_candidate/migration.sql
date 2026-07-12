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
