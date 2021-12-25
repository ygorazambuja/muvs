/*
  Warnings:

  - You are about to drop the column `link` on the `Torrent` table. All the data in the column will be lost.
  - Added the required column `imdb` to the `Torrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magnet` to the `Torrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Torrent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Torrent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Torrent" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "magnet" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "imdb" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "movieUuid" TEXT,
    CONSTRAINT "Torrent_movieUuid_fkey" FOREIGN KEY ("movieUuid") REFERENCES "Movie" ("uuid") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Torrent" ("movieUuid", "title", "uuid") SELECT "movieUuid", "title", "uuid" FROM "Torrent";
DROP TABLE "Torrent";
ALTER TABLE "new_Torrent" RENAME TO "Torrent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
