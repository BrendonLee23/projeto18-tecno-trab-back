CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "born" DATE,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "confirmPassword" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE services (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "providerId" INT REFERENCES users("id"),
    "phoneNumber" TEXT,
    "isAvailable" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    "id" SERIAL PRIMARY KEY,
    "token" TEXT NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);