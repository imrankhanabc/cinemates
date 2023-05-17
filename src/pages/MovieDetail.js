import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Backup from "../assets/images/backup.png";

export const MovieDetail = () => {
  const parms = useParams();
  const [movie, setMovie] = useState({});
       useTitle(movie.title);
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : Backup;
  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${parms.id}?api_key=83bec00dff0953dadaac89ad8edaccfd`
      );
      const json = await response.json();
      setMovie(json);
    }
    fetchMovie();
  }, [parms.id]);
  
  return (
    <>
      <main>
        <section className="flex justify-around flex-wrap py-5">
          <div className="max-w-sm">
            <img className="rounded" src={image} alt={movie.title} />
          </div>

          <div className="max-w-2xl text-gray-700 text-lg dark:text-white">
            <h1 className="text-4xl font-bold my-3 text-center lg:text-left">
              {movie.title}
            </h1>
            <p className="my-3">{movie.overview}</p>

            {movie.genres ? (
              <p className="my-7 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    className="mr-2 rounded border border-gray-200 dark:borer-gray-200 p-2"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                ))}
              </p>
            ) : (
              ""
            )}

            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Rating star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                {movie.vote_average}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <span href="#" className=" text-gray-900 dark:text-white">
                {movie.vote_count}
              </span>
            </div>
            <p className="my-2">
              <span className="mr-2 font-bold">Runtime:</span>
              <span>{movie.runtime}.min</span>
            </p>

            <p className="my-2">
              <span className="mr-2 font-bold">Budget:</span>
              <span>{movie.budget}</span>
            </p>

            <p className="my-2">
              <span className="mr-2 font-bold">Revenue:</span>
              <span>{movie.revenue}</span>
            </p>

            <p className="my-2">
              <span className="mr-2 font-bold">IMDB Code:</span>
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {movie.imdb_id}
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};
