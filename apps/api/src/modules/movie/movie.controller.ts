import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  getMovieById(@Query('id') id: string) {
    if (!id) return this.movieService.getMovies();
    return this.movieService.getMovieById(id);
  }

  @Post('/tmdb/:id')
  async createMovieWithTMDBMovieId(@Param('id') tmdbMovieId: number) {
    return await this.movieService.insertMovieWithTMDBMovieId(tmdbMovieId);
  }

  @Delete('/:id')
  async deleteMovie(@Param('id') id: string) {
    return await this.movieService.deleteMovie(id);
  }

  @Get('/trending')
  async getTrendingMovies() {
    return await this.movieService.getTrendingMovies();
  }

  @Get('/torrent/:id')
  async getTorrents(@Param('id') movieId: string) {
    return await this.movieService.getTorrents(movieId);
  }
}
