/*
  Warnings:

  - A unique constraint covering the columns `[magnet]` on the table `Torrent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Torrent_magnet_key" ON "Torrent"("magnet");
