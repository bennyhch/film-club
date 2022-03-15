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

export type ContextProps = {
  actors: Array<ListByType<CastCredit>>;
  directors: Array<ListByType<CrewCredit>>;
  genres: Array<NewGenreList>;
  movies: Array<Movie>;
  userMovielist: Array<Movie>;
  userActorlist: Array<UserActorRating>;
  userDirectorlist: Array<UserDirectorRating>;
  userGenrelist: Array<GenreRating>;
  watchlistMovies: Array<Movie>;
  setWatchlistMovies: Dispatch<SetStateAction<Movie[]>>;
  watchedMovies: Array<Movie>;
  addWatchlistFromHome: (filmToAdd: Movie) => void;
  addWatchedFromHome: (element: Movie, userRating: number) => void;
  deleteMovieFromHome: (element: Movie) => void;
};

export type WatchlistProps = {
  setActors: Dispatch<SetStateAction<Array<ListByType<CastCredit>>>>;
  actors: Array<ListByType<CastCredit>>;
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

export interface WatchedProps {
  actors: Array<ListByType<CastCredit>>;
  directors: Array<ListByType<CrewCredit>>;
  genres: Array<NewGenreList>;
  movies: Array<Movie>;
  userMovielist: Array<Movie>;
  userActorlist: Array<UserActorRating>;
  userDirectorlist: Array<UserDirectorRating>;
  userGenrelist: Array<GenreRating>;
  deleteMovieFromHome: (element: Movie) => void;
  watchlistMovies: Array<Movie>;
  watchedMovies: Array<Movie>;
  addWatchlistFromHome: (filmToAdd: Movie) => void;
  addWatchedFromHome: (element: Movie, userRating: number) => void;
  setWatchlistMovies: Dispatch<SetStateAction<Array<Movie>>>;
  setGenres: Dispatch<SetStateAction<Array<NewGenreList>>>;
  setDirectors: Dispatch<SetStateAction<Array<ListByType<CrewCredit>>>>;
  setActors: Dispatch<SetStateAction<Array<ListByType<CastCredit>>>>;
}
// Figure this out
export type ModalProps = {
  closeModal: () => void;
  show: boolean;
  addWatch: Movie;
  addWatchedFromHome: (element: Movie, userRating: number) => void;
};

export type ReelProps = {
  movies: Movie[];
  openModal: (element: Movie) => void;
};
