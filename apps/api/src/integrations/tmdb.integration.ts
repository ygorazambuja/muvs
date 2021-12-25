import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TMDBMovie } from './tmdb.movie';

@Injectable()
export class TmdbIntegration {
  async getMovieById(movieId: number): Promise<TMDBMovie> {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    return data;
  }

  async getTrendingMovies(): Promise<TMDBMovie[]> {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    return data.results;
  }
}
