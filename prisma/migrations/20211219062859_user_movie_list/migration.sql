-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovieList" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "userUuid" TEXT,
    CONSTRAINT "MovieList_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MovieList" ("title", "uuid") SELECT "title", "uuid" FROM "MovieList";
DROP TABLE "MovieList";
ALTER TABLE "new_MovieList" RENAME TO "MovieList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
