-- CreateTable
CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "stations" (
    "station_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "station_name" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "trains" (
    "train_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "train_name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "stops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "arrival_time" TEXT,
    "departure_time" TEXT,
    "fare" INTEGER NOT NULL,
    "station_id" INTEGER NOT NULL,
    "train_id" INTEGER NOT NULL,
    CONSTRAINT "stops_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations" ("station_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stops_train_id_fkey" FOREIGN KEY ("train_id") REFERENCES "trains" ("train_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tickets" (
    "ticket_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wallet_id" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    CONSTRAINT "tickets_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "station_tickets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "station_id" INTEGER NOT NULL,
    "train_id" INTEGER,
    "arrival_time" TEXT,
    "departure_time" TEXT,
    "ticket_id" INTEGER NOT NULL,
    CONSTRAINT "station_tickets_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations" ("station_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "station_tickets_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets" ("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
