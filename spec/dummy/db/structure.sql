CREATE TABLE "schema_migrations" ("version" varchar NOT NULL PRIMARY KEY);
CREATE TABLE "ar_internal_metadata" ("key" varchar NOT NULL PRIMARY KEY, "value" varchar, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "recipes" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar, "directions" text, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "ingredients" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar, "amount" float, "unit" varchar, "recipe_id" integer, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "rails_probe_reports" ("id" uuid NOT NULL PRIMARY KEY, "host" varchar, "session" varchar, "user_id" integer, "action" varchar, "path" varchar, "data" varchar, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
INSERT INTO "schema_migrations" (version) VALUES
('20170430144930'),
('20170430145131'),
('20170704021906');


