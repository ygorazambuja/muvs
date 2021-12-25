-- CreateTable
CREATE TABLE "Torrent" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "movieUuid" TEXT,
    CONSTRAINT "Torrent_movieUuid_fkey" FOREIGN KEY ("movieUuid") REFERENCES "Movie" ("uuid") ON DELETE SET NULL ON UPDATE CASCADE
);
