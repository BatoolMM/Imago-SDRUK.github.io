CREATE TYPE "public"."question_type_enum" AS ENUM('string', 'select', 'multiple_select', 'number', 'bool', 'countries');--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('published', 'archived', 'draft');--> statement-breakpoint
CREATE TYPE "public"."user_status_enum" AS ENUM('preregister', 'active', 'archived', 'draft', 'suspended');--> statement-breakpoint
CREATE TABLE "answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"free_text" text,
	"number" numeric,
	"bool" boolean,
	"time" time,
	"answer" text,
	"question_reference" text,
	"question" uuid NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"status" "status_enum" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp (3) with time zone
);
--> statement-breakpoint
CREATE TABLE "downloads" (
	"resource" uuid NOT NULL,
	"version" uuid,
	"user" uuid NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"required" boolean,
	"group" text,
	"type" "question_type_enum" DEFAULT 'string',
	"options" jsonb DEFAULT '[]'::jsonb,
	"conditionals" jsonb DEFAULT '[]'::jsonb,
	"visibility" boolean DEFAULT false,
	"created_by" uuid,
	"updated_by" uuid,
	"status" "status_enum" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp (3) with time zone
);
--> statement-breakpoint
CREATE TABLE "resource_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" text NOT NULL,
	"changelog" text,
	"url" text,
	"downloads" integer DEFAULT 0 NOT NULL,
	"resource" uuid NOT NULL,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	"status" "status_enum" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	"status" "status_enum" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"preferences" jsonb,
	"status" "user_status_enum" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_questions_id_fk" FOREIGN KEY ("question") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "downloads" ADD CONSTRAINT "downloads_resource_resources_id_fk" FOREIGN KEY ("resource") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "downloads" ADD CONSTRAINT "downloads_version_resource_versions_id_fk" FOREIGN KEY ("version") REFERENCES "public"."resource_versions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "downloads" ADD CONSTRAINT "downloads_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_versions" ADD CONSTRAINT "resource_versions_resource_resources_id_fk" FOREIGN KEY ("resource") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_versions" ADD CONSTRAINT "resource_versions_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_versions" ADD CONSTRAINT "resource_versions_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_question_idx" ON "answers" USING btree ("created_by","question");--> statement-breakpoint
CREATE INDEX "user_resource_download_idx" ON "downloads" USING btree ("user","resource");--> statement-breakpoint
CREATE INDEX "resource_published_idx" ON "resources" USING btree ("status") WHERE "resources"."status" = 'published';--> statement-breakpoint
CREATE INDEX "users_active_idx" ON "users" USING btree ("id") WHERE "users"."status" = 'active';