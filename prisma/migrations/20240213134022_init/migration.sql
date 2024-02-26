/*
  Warnings:

  - Added the required column `dateOfBirth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gpa` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rollno` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "gpa" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rollno" BIGINT NOT NULL;
