import { YButton } from '@muvs/ui-components';
import axios from 'axios';
import Image from 'next/image';

type Movie = {
  adult: boolean;
  backdrop_path: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  status: string;
  tagline: string;
  title: string;
  tmbdMovieId: string;
  vote_average: number;
  vote_count: number;
};

type Props = {
  movies: Movie[];
};

export function index({ movies }: Props) {
  const getImageUrl = (path: string) => `http://image.tmdb.org/t/p/w500${path}`;

  return (
    <div>
      <YButton />
      {movies.map((movie) => {
        return (
          <div key={movie.tmbdMovieId}>
            <h2>{movie.title}</h2>
            <Image
              loading="lazy"
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              width={200}
              height={300}
            />
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get('https://api-muvs.herokuapp.com/api/movies');

  return {
    props: {
      movies: data,
    },
  };
}

export default index;
