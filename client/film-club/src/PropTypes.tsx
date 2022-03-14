import { Dispatch, SetStateAction } from "react";

export type HomeProps = {
  actors: Array<ListByType<CastCredit>>;
  directors: Array<ListByType<CrewCredit>>;
  genres: Array<NewGenreList>;
  movies: Array<Movie>;
  userMovielist: Array<Movie>;
  userActorlist: Array<UserActorRating>;
  userDirectorlist: Array<UserDirectorRating>;
  userGenrelist: Array<GenreRating>;
  deleteMovieFromHome: (element: Movie) => void;
  watchlistMovies: [Array<Movie>, Dispatch<SetStateAction<Movie[]>>];
  watchedMovies: Array<Movie>;
  addWatchlistFromHome: (filmToAdd: Movie) => void;
  addWatchedFromHome: (element: Movie, userRating: number) => void;
};
