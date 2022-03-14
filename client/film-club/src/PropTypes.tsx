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
  watchlistMovies: [Array<Movie>, Dispatch<SetStateAction<Movie[]>>];
  watchedMovies: Array<Movie>;
  addWatchlistFromHome: (filmToAdd: Movie) => void;
  addWatchedFromHome: (element: Movie, userRating: number) => void;
  deleteMovieFromHome: (element: Movie) => void;
};

export type WatchlistProps = {
  actors: Array<ListByType<CastCredit>>;
  setActors: Dispatch<SetStateAction<Array<ListByType<CastCredit>>>>;
  directors: Array<ListByType<CrewCredit>>;
  genres: Array<NewGenreList>;
  movies: Array<Movie>;
  userMovielist: [Array<Movie>, Dispatch<SetStateAction<Movie[]>>];
  userActorlist: Array<UserActorRating>;
  userDirectorlist: Array<UserDirectorRating>;
  userGenrelist: Array<GenreRating>;
  watchlistMovies: Array<Movie>;
  watchedMovies: Array<Movie>;
  addWatchlistFromHome: (filmToAdd: Movie) => void;
  addWatchedFromHome: (element: Movie, userRating: number) => void;
  setWatchlistMovies: Dispatch<SetStateAction<Array<Movie>>>;
  setGenres: Dispatch<SetStateAction<Array<NewGenreList>>>;
  setDirectors: Dispatch<SetStateAction<Array<ListByType<CrewCredit>>>>;
  deleteMovieFromHome: (element: Movie) => void;
};
