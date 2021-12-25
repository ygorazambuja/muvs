import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma-service';
import { TmdbIntegration } from '../../integrations/tmdb.integration';
import { TorrentIntegration } from '../../integrations/torrent.integration';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, PrismaService, TmdbIntegration, TorrentIntegration],
})
export class MovieModule {}
