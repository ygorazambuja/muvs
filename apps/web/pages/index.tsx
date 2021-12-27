import axios from 'axios';
import Head from 'next/head';
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
      <Head>
        <title>Muvs - Home</title>
      </Head>
      <div
        style={{ display: 'grid', gridTemplateColumns: '300px 300px 300px' }}
      >
        {movies.map((movie) => {
          return (
            <div
              key={movie.tmbdMovieId}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
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
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get('http://localhost:3333/api/movies');

  return {
    props: {
      movies: data,
    },
  };
}

export default index;
