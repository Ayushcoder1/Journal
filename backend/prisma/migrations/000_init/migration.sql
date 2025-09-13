-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."bookmarks" (
    "user_id" BIGINT NOT NULL,
    "post_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateTable
CREATE TABLE "public"."post" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,
    "authorid" BIGINT,
    "reads" BIGINT DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "name" VARCHAR(40),
    "password" VARCHAR(40) NOT NULL,
    "about" TEXT DEFAULT 'Hello fellas, happy reading',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."bookmarks" ADD CONSTRAINT "bookmarks_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."bookmarks" ADD CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."post" ADD CONSTRAINT "post_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

