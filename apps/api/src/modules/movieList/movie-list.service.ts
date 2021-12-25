import { BadRequestException, Injectable } from '@nestjs/common';
import { MovieList, PrismaClient } from '@prisma/client';
import { InsertMovieDTO, InsertMoviesDTO } from './dtos';

@Injectable()
export class MovieListService {
  constructor(private prisma: PrismaClient) {}

  async getMovieListById(uuid: string): Promise<MovieList> {
    return await this.prisma.movieList.findFirst({
      where: {
        uuid,
      },
      include: {
        movies: {
          include: {
            movie: true,
          },
        },
        user: true,
      },
    });
  }

  async insertMovieList({ user, movieList }): Promise<MovieList> {
    if (!user) throw new BadRequestException('Invalid User');

    return await this.prisma.movieList.create({
      data: {
        ...movieList,
        user: {
          connect: {
            uuid: user.uuid,
          },
        },
      },
    });
  }

  async insertMovieIntoMovieList({
    movieListId,
    moviesIds,
  }: InsertMoviesDTO): Promise<MovieList> {
    await Promise.all(
      moviesIds.map((movieId) => {
        return this.insertMovie({ movieListId, movieId });
      })
    );

    return await this.getMovieListById(movieListId);
  }

  async insertMovie({ movieListId, movieId }: InsertMovieDTO) {
    return await this.prisma.moviesOnMovieList.create({
      data: {
        movieList: {
          connect: {
            uuid: movieListId,
          },
        },
        movie: {
          connect: {
            uuid: movieId,
          },
        },
      },
    });
  }

  async getAllUserMovieList(user): Promise<Partial<MovieList>[]> {
    if (!user) throw new BadRequestException('Invalid User');

    return await this.prisma.movieList.findMany({
      where: {
        userUuid: user.uuid,
      },
      select: {
        uuid: true,
        title: true,
      },
    });
  }
}
