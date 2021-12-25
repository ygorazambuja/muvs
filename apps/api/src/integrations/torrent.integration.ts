import { Injectable, NotFoundException } from '@nestjs/common';

import * as TorrentSearchApi from 'torrent-search-api';
import { PrismaService } from '../infra/prisma-service';

@Injectable()
export class TorrentIntegration {
  constructor(private prisma: PrismaService) {}

  async searchMovie(title: string) {
    TorrentSearchApi.enableProvider('ThePirateBay');

    return await TorrentSearchApi.search(title, 'Video', 20);
  }

  async addTorrentsToMovie({ movieId, torrents }) {
    const movie = await this.prisma.movie.findFirst({
      where: {
        uuid: movieId,
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    Promise.all(
      torrents.map((torrent) => {
        return this.prisma.torrent.create({
          data: {
            magnet: torrent.magnet,
            provider: torrent.provider,
            size: torrent.size,
            title: torrent.title,
            imdb: torrent.imdb,
            movie: {
              connect: {
                uuid: movie.uuid,
              },
            },
          },
        });
      })
    );
  }
}
