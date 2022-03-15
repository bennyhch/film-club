/* 
  Deal with collections later.
*/
export type UserMovieCollection = Array<Movie>;

export type User = {
  id: string;
  email: string;
  password: string;
  _v: number;
};

export type UserMovieList = {
  email: string;
  _id: string;
  movielist: Array<MovieExtended>;
  genres: Array<MovieGenreRating>;
  directors: Array<UserDirector>;
  actors: Array<UserActor>;
  __v: number;
};

// The type in the collection
export type Movie = {
  collectionID: number;
  inWatchlist: boolean;
  seen: boolean;
  user_rating: number | null;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  title: string;
  id: number;
  character: string;
};

// The type in the 'movielist'

export interface MovieExtended extends Movie {
  backdrop_path: string;
  belongs_to_collection: TMDBCollection;
  budget: number;
  genres: Array<GenreRating>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  title: string;
  video: boolean;
  vote_count: number;
  credits: Credits;
}

export interface GenreRating {
  movid?: number;
  name: string;
  id: number;
  rating?: number | null;
  count?: number;
}

export interface DirectorRating {
  movid?: number;
  name: string;
  id: number;
  rating: number | null;
  count?: number;
}

export interface ActorRating {
  name: string;
  id: number;
  rating: number | null;
  count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieGenreRating {
  id: number;
  movid: number;
  genreId: number;
  name: string;
  rating: number;
}

export interface UserDirector {
  movid: number;
  id: number;
  name: string;
  rating: number;
}

export interface UserActor {
  movid: number;
  id: number;
  name: string;
  rating: number;
}

export interface Credits {
  cast: Array<CastCredit>;
  crew: Array<CrewCredit>;
}

/* 
API types
*/
export interface TMDBCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface OnLoadResponse {
  trendingMovies: Array<APIMovieWithGenre>;
  user: UserMovieList;
  actors: Array<CastCredit>;
  directors: Array<CrewCredit>;
}

// type CreditFromAPI = {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: Array<number>;
//   original_language: string;
//   original_title: string;
//   poster_path: string;
//   vote_count: number;
//   id: number;
//   vote_average: number;
//   video: number;
//   overview: string;
//   release_date: string;
//   title: string;
//   popularity: number;
//   character: string;
//   credit_id: string;
//   order: number;
// };

export interface CrewCredit {
  id: number;
  name: string;
  department: string;
  original_language: string;
  original_title: string;
  job: string;
  overview: string;
  vote_count: number;
  video: boolean;
  poster_path: string;
  backdrop_path: string;
  title: string;
  popularity: number;
  genre_ids: [12, 18, 14, 878];
  vote_average: number;
  adult: boolean;
  release_date: string;
  credit_id: string;
  inWatchlist: boolean;
  seen: boolean;
  user_rating: number;
}

export type CastCredit = {
  character: string;
  credit_id: string;
  release_date: string;
  vote_count: number;
  video: false;
  adult: false;
  vote_average: number;
  title: string;
  genre_ids: Array<number>;
  original_language: string;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
};

export type APIMovieWithGenre = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

/* 
  I have changed the genres from this:
    [
      [genreName]: string,
      [genreName]: string,
      [genreName]: string,
      Array<APIMovieGenre>,
      ...
      ...
    ]
*/
export type GenreResponse = Array<NewGenreList>;

export type NewGenreList = {
  genreName: string;
  movies: Array<APIMovieWithGenre> | undefined;
};

export type NewDirectorList = {
  directorName: string;
  movies: Array<CrewCredit>;
};
export type NewActorList = {
  actorName: string;
  movies: Array<CastCredit>;
};

// User also has _id and __v.
export type CreateUserReturn = {
  newUser: User;
  newMovielistUser: UserMovieList;
  newMovieCollectionUser: MovieCollectionResponse;
};

export type MovieCollectionResponse = {
  email: string;
  _id: string;
  person?: {
    id: number;
    name: string;
  };
  moviecoll: UserMovieCollection;
};

export type WatchlistResponse = {
  watchlistMovieLists: Array<Array<MovieExtended>>;
  genreMovieLists: Array<Array<APIMovieWithGenre>>;
  actorMovieLists: Array<Array<CastCredit>>;
  directorMovieLists: Array<Array<CrewCredit>>;
};
