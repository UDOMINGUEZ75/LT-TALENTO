-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "education" JSONB,
ADD COLUMN     "experience" JSONB,
ADD COLUMN     "headline" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "summary" TEXT;

-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "recruiterId" INTEGER;

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

-- CreateIndex
CREATE UNIQUE INDEX "Recruiter_userId_key" ON "Recruiter"("userId");

-- AddForeignKey
ALTER TABLE "Recruiter" ADD CONSTRAINT "Recruiter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
