-- CreateTable
CREATE TABLE "public"."comments" (
    "id" BIGSERIAL NOT NULL,
    "postid" BIGINT NOT NULL,
    "authorid" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comments_postid_idx" ON "public"."comments"("postid");

-- CreateIndex
CREATE INDEX "comments_authorid_idx" ON "public"."comments"("authorid");

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_postid_fkey" FOREIGN KEY ("postid") REFERENCES "public"."post"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
