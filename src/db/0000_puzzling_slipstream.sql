CREATE TABLE "todo_entity" (
	"id" text NOT NULL,
	"title" text NOT NULL,
	"completed" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now(),
	"isDeleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "todo_entity_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX "todo_id" ON "todo_entity" USING btree ("id");