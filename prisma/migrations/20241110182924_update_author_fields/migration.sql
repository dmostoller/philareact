-- Step 1: Add nullable authorId columns
ALTER TABLE "Post" ADD COLUMN "authorId" TEXT;
ALTER TABLE "Reply" ADD COLUMN "authorId" TEXT;

-- Step 2: Copy existing author values to authorId
UPDATE "Post" SET "authorId" = "author";
UPDATE "Reply" SET "authorId" = "author";

-- Step 3: Make authorId required
ALTER TABLE "Post" ALTER COLUMN "authorId" SET NOT NULL;
ALTER TABLE "Reply" ALTER COLUMN "authorId" SET NOT NULL;

-- Step 4: Add foreign key constraints
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 5: Drop old author columns
ALTER TABLE "Post" DROP COLUMN "author";
ALTER TABLE "Reply" DROP COLUMN "author";