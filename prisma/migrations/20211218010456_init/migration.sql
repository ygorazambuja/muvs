/*
  Warnings:

  - You are about to drop the column `movieListUuid` on the `Movie` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "MoviesOnMovieList" (
    "movieId" TEXT NOT NULL,
    "movieListId" TEXT NOT NULL,

    PRIMARY KEY ("movieId", "movieListId"),
    CONSTRAINT "MoviesOnMovieList_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MoviesOnMovieList_movieListId_fkey" FOREIGN KEY ("movieListId") REFERENCES "MovieList" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "tmbdMovieId" INTEGER NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "backdrop_path" TEXT,
    "overview" TEXT NOT NULL,
    "popularity" REAL NOT NULL,
    "poster_path" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "vote_average" REAL NOT NULL,
    "vote_count" INTEGER NOT NULL
);
INSERT INTO "new_Movie" ("adult", "backdrop_path", "overview", "popularity", "poster_path", "release_date", "status", "tagline", "title", "tmbdMovieId", "uuid", "vote_average", "vote_count") SELECT "adult", "backdrop_path", "overview", "popularity", "poster_path", "release_date", "status", "tagline", "title", "tmbdMovieId", "uuid", "vote_average", "vote_count" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_tmbdMovieId_key" ON "Movie"("tmbdMovieId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
