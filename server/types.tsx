/* 
  Deal with collections later.
*/
type UserMovieCollection = Array<Movie>;

type WatchedResponse = {
  watchedMovies: Array<Array<MovieListItem>>;
  genres: Array<NewGenreList>;
  directors: Array<NewDirectorList>;
  actors: Array<NewActorList>;
};

interface UserInfo {
  _id?: string;
  email: string;
  password: string;
  _v?: number;
}

type UserMovieList = {
  email: string;
  _id: string;
  movielist: Array<MovieListItem>;
  genres: Array<Genres>;
  directors: Array<UserDirector>;
  actors: Array<UserActor>;
  __v: number;
};

// The type in the collection
type Movie = {
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

// interface DirectorRating {
//   movid?: number;
//   name: string;
//   id: number;
//   rating: number | null;
//   count?: number;
// }

// interface ActorRating {
//   name: string;
//   id: number;
//   rating: number | null;
//   count: number;
// }

interface UserDirector {
  movid: number;
  id: number;
  name: string;
  rating: number;
}

interface UserActor {
  movid: number;
  id: number;
  name: string;
  rating: number;
}

interface Credits {
  cast: Array<CastCredit>;
  crew: Array<CrewCredit>;
}

/* 
API types
*/
interface TMDBCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface CrewCredit {
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

interface CastCredit {
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
}

type APIMovieWithGenre = {
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

type NewGenreList = {
  genreName: string;
  movies: Array<APIMovieWithGenre> | undefined;
};

type NewDirectorList = {
  directorName: string;
  movies: Array<CrewCredit>;
};
type NewActorList = {
  actorName: string;
  movies: Array<CastCredit>;
};

type WatchlistResponse = {
  watchlistMovieLists: Array<Array<MovieListItem>>;
  genreMovieLists: Array<Array<APIMovieWithGenre>>;
  actorMovieLists: Array<Array<CastCredit>>;
  directorMovieLists: Array<Array<CrewCredit>>;
};

/////////////////

interface MovieListInfo {
  email: string;
  movielist: Array<MovieListItem>;
  genres: Array<Genres>;
  directors: Array<Directors>;
  actors: Array<Actors>;
}

interface MovieListItem {
  inWatchlist: boolean;
  seen: boolean;
  user_rating: number | null;
  backdrop_path: string;
  belongs_to_collection: Collection;
  budget: number;
  genres: Array<GenresMovielist>;
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
  vote_average: number;
  vote_count: number;
  credits: Credits;
}

interface GenresMovielist {
  id: number;
  name: string;
  movid?: number;
  rating: number | null;
}

interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface CastCredit {
  id: number;
  known_for_department: string;
  name: string;
  character: string;
  credit_id: string;
  order: number;
}
interface CrewCredit {
  id: number;
  known_for_department: string;
  name: string;
  credit_id: string;
  department: string;
  job: string;
}

interface Credits {
  cast: Array<CastCredit>;
  crew: Array<CrewCredit>;
}

interface Genre {
  id: number;
  name: string;
}

interface Genres extends Genre {
  movid?: number;
  rating: number;
  count: number;
}

interface Directors {
  movid?: number;
  id: number;
  name: string;
  rating: number | null;
  count?: number;
}

interface Actors {
  movid?: number;
  id: number;
  name: string;
  rating: number;
  count?: number;
}
