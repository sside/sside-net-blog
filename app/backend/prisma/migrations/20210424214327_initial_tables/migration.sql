-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR', 'GUEST');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('BLOG_ENTRY', 'PAGE');

-- CreateTable
CREATE TABLE "User" (
    "id" CHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mailAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'EDITOR',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" CHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "contentType" "ContentType" NOT NULL,
    "userId" CHAR(36) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentHistory" (
    "id" CHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "contentId" CHAR(36) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaTag" (
    "id" CHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContentToMetaTag" (
    "A" CHAR(36) NOT NULL,
    "B" CHAR(36) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.mailAddress_unique" ON "User"("mailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Content.slug_unique" ON "Content"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MetaTag.name_unique" ON "MetaTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentToMetaTag_AB_unique" ON "_ContentToMetaTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentToMetaTag_B_index" ON "_ContentToMetaTag"("B");

-- AddForeignKey
ALTER TABLE "Content" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentHistory" ADD FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToMetaTag" ADD FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToMetaTag" ADD FOREIGN KEY ("B") REFERENCES "MetaTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
