import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MovieListController } from './movie-list.controller';
import { MovieListService } from './movie-list.service';

@Module({
  providers: [PrismaClient, MovieListService],
  controllers: [MovieListController],
})
export class MovieListModule {}
