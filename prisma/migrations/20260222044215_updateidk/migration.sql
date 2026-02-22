-- CreateEnum
CREATE TYPE "SexualOrientation" AS ENUM ('ASEXUAL', 'BISEXUAL', 'GAY', 'HETEROSEXUAL', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "RelationshipStatus" AS ENUM ('SINGLE', 'IN_RELATIONSHIP', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- DropEnum
DROP TYPE "SexualAlignment";

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "preferredName" TEXT,
    "briefDescription" TEXT,
    "bio" TEXT,
    "Species" TEXT NOT NULL,
    "gender" "Gender",
    "orientation" "SexualOrientation",
    "thumbnailUrl" TEXT,
    "avatarUrl" TEXT,
    "imageURLs" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isVerified" BOOLEAN DEFAULT false,
    "hasFursuit" BOOLEAN DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sexuality_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orientation" "SexualOrientation",
    "openForSexualContacts" BOOLEAN DEFAULT false,

    CONSTRAINT "user_sexuality_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_relationship_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "relationshipStatus" "RelationshipStatus",
    "isLookingForPartner" BOOLEAN DEFAULT false,

    CONSTRAINT "user_relationship_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_id_key" ON "characters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "characters"("name");

-- CreateIndex
CREATE INDEX "characters_userId_idx" ON "characters"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_sexuality_preferences_userId_key" ON "user_sexuality_preferences"("userId");

-- CreateIndex
CREATE INDEX "user_sexuality_preferences_userId_idx" ON "user_sexuality_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_relationship_preferences_userId_key" ON "user_relationship_preferences"("userId");

-- CreateIndex
CREATE INDEX "user_relationship_preferences_userId_idx" ON "user_relationship_preferences"("userId");

-- CreateIndex
CREATE INDEX "events_userId_idx" ON "events"("userId");

-- CreateIndex
CREATE INDEX "events_startAt_idx" ON "events"("startAt");

-- CreateIndex
CREATE INDEX "user_profiles_userId_idx" ON "user_profiles"("userId");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sexuality_preferences" ADD CONSTRAINT "user_sexuality_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_relationship_preferences" ADD CONSTRAINT "user_relationship_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
