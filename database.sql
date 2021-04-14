-- CREATE DATABASE canomiks_db
CREATE TABLE "companies" (
	"id" SERIAL PRIMARY KEY,
	"active" BOOLEAN NOT NULL DEFAULT false,
	"companyName" VARCHAR(255) NOT NULL,
	"address" VARCHAR(255) NOT NULL,
	"city" VARCHAR(50) NOT NULL,
	"state" VARCHAR(50) NOT NULL,
	"zip" INT NOT NULL,
	"phoneNumber" VARCHAR(10) NOT NULL,
	"alertStatusChange" BOOLEAN NOT NULL DEFAULT false,
	"alertResultsReady" BOOLEAN NOT NULL DEFAULT false,
	"alertDelay" BOOLEAN NOT NULL DEFAULT false
);

CREATE TYPE auth AS ENUM ('lead', 'team', 'admin', 'lab');

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"name" VARCHAR(50) NOT NULL,
	"companyID" INT NOT NULL REFERENCES "companies",
	"authLevel" auth DEFAULT 'team'
);

CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY,
	"companyID" INT NOT NULL REFERENCES "companies",
	"ingredientName" VARCHAR(255),
	"ingredientAmount" NUMERIC(4,3),
	"ingredientUnit" VARCHAR(12),
	"format" VARCHAR(50),
	"purity" INT,
	"dateManufactured" DATE,
	"lotNumber" VARCHAR(255),
	"extractionMethod" VARCHAR(255),
	"city" VARCHAR(50),
	"state" VARCHAR(50),
	"country" VARCHAR(255),
	"harvestDate" DATE,
	"cropStrain" VARCHAR(255),
	"sustainabilityInfo" VARCHAR(255),
	"shippedDate" DATE ,
	"carrierName" VARCHAR(255),
	"trackingNumber" VARCHAR(255),
	"receivedDate" DATE,
	"testingStatus" VARCHAR(255),
	"delayed" BOOLEAN DEFAULT false,
	"pdfUrl" VARCHAR(255)
);

--Create base accounts
INSERT INTO "companies" ("active", "companyName", "address", "city", "state", "zip", "phoneNumber")
VALUES (true, 'Canomiks', '123 Main St', 'Minneapolis', 'MN', '55105', '6125555678');

INSERT INTO "users" ("email", "password", "name", "companyID", "authLevel")
VALUES ('admin@canomiks.com', '$2a$10$BlrnXuMWF5tge3hwQYS.Oe02lTAZc6khtkJFYKOIhvP6Yi34qkvEW', 'Admin', '1', 'admin'),
		('lab@canomiks.com', '$2a$10$BlrnXuMWF5tge3hwQYS.Oe02lTAZc6khtkJFYKOIhvP6Yi34qkvEW', 'Lab', '1', 'lab');

