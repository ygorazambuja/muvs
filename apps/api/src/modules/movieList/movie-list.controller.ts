import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MovieList } from '@prisma/client';
import { MovieListService } from './movie-list.service';

import { AuthGuard } from '../user/user.decorator';

@Controller('movie-list')
export class MovieListController {
  constructor(private movieListService: MovieListService) {}

  @Get('/:id')
  getMovieListById(@Param('id') id: string) {
    return this.movieListService.getMovieListById(id);
  }

  @Post()
  insertMovieList(@AuthGuard() user, @Body() movieList: MovieList) {
    return this.movieListService.insertMovieList({ user, movieList });
  }

  @Post('/:id/movie/')
  insertMovieIntoMovieList(@Param('id') id: string, @Body() body) {
    const { movies } = body;
    return this.movieListService.insertMovieIntoMovieList({
      movieListId: id,
      moviesIds: movies,
    });
  }

  @Get('/')
  async getAllUserMovieList(@AuthGuard() user) {
    return this.movieListService.getAllUserMovieList(user);
  }
}
