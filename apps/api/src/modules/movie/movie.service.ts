import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from '../../infra/prisma-service';
import { TmdbIntegration } from '../../integrations/tmdb.integration';
import { TMDBMovie } from '../../integrations/tmdb.movie';
import { TorrentIntegration } from '../../integrations/torrent.integration';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private tmdbIntegration: TmdbIntegration,
    private torrentIntegration: TorrentIntegration
  ) {}

  async getMovies(): Promise<Array<Movie>> {
    return await this.prisma.movie.findMany();
  }

  async getTMBDMovieId(id: number): Promise<Movie> {
    return await this.prisma.movie.findFirst({
      where: {
        tmbdMovieId: Number(id),
      },
      include: {
        movieList: true,
      },
    });
  }

  async getMovieById(uuid: string): Promise<Movie> {
    return await this.prisma.movie.findFirst({
      where: {
        uuid,
      },
      include: {
        movieList: {
          include: {
            movieList: true,
          },
        },
      },
    });
  }

  async insertMovieWithTMDBMovieId(tmdbMovieId: number): Promise<Movie> {
    const movieAlreadyExistsOnDatabase = await this.getTMBDMovieId(tmdbMovieId);

    if (movieAlreadyExistsOnDatabase) {
      return movieAlreadyExistsOnDatabase;
    }

    const tmdbMovie = await this.tmdbIntegration.getMovieById(tmdbMovieId);

    const addedMovie = await this.prisma.movie.create({
      data: {
        title: tmdbMovie.title,
        adult: tmdbMovie.adult,
        backdrop_path: tmdbMovie.backdrop_path,
        tagline: tmdbMovie.tagline,
        overview: tmdbMovie.overview,
        popularity: tmdbMovie.popularity,
        poster_path: tmdbMovie.poster_path,
        release_date: tmdbMovie.release_date,
        vote_count: tmdbMovie.vote_count,
        vote_average: tmdbMovie.vote_average,
        status: tmdbMovie.status,
        tmbdMovieId: tmdbMovie.id,
      },
    });

    this.getTorrents(addedMovie.uuid);

    return addedMovie;
  }

  async deleteMovie(uuid: string): Promise<Movie> {
    return await this.prisma.movie.delete({
      where: {
        uuid,
      },
    });
  }

  async getTrendingMovies(): Promise<TMDBMovie[]> {
    const trendingMovies = await this.tmdbIntegration.getTrendingMovies();

    await Promise.all(
      trendingMovies.map((movie) => {
        return this.insertMovieWithTMDBMovieId(movie.id);
      })
    );
    return trendingMovies;
  }

  async getTorrents(movieId: string): Promise<any> {
    const movie = await this.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const results = await this.torrentIntegration.searchMovie(movie.title);

    this.torrentIntegration.addTorrentsToMovie({
      movieId: movie.uuid,
      torrents: results,
    });
  }
}
