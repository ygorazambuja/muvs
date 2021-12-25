import { Movie } from '../movie/movie.entity';

export class MovieList {
  uuid: string;
  title: string;

  movies?: Movie[];
}
