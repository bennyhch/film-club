type UserMovieCollection = Array<Movie>;

type User = {
  id: string;
  email: string;
  password: string;
  _v: number;
};

type UserMovieList = {
  email: string;
  _id: string;
  movielist: Array<MovieExtended>;
  genres: Array<MovieGenreRating>;
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

interface MovieExtended extends Movie {
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

interface GenreRating {
  name: string;
  id: number;
  rating: number | null;
  count: number;
}

interface DirectorRating {
  name: string;
  id: number;
  rating: number | null;
  count?: number;
}

interface ActorRating {
  name: string;
  id: number;
  rating: number | null;
  count: number;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieGenreRating {
  id: number;
  movid: number;
  genreId: number;
  name: string;
  rating: number;
}

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

interface TMDBCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Credits {
  cast: Array<Cast>;
  crew: Array<Crew>;
}

interface Cast extends Credit {
  character: string;
  order: number;
}

interface Crew extends Credit {
  department: string;
  job: string;
}

interface Credit extends Person {
  id: number;
  name: string;
  credit_id: string;
}

/* 
  API types
  
*/

interface Person {
  id: number;
  known_for_department: string | null;
  popularity: number;
}

interface OnLoadResponse {
  trendingMovies: Array<APIMovieWithGenre>;
  user: UserMovieList;
  actors: Array<CreditFromAPI>;
  directors: Array<CreditFromAPI>;
}

type CreditFromAPI = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  original_language: string;
  original_title: string;
  poster_path: string;
  vote_count: number;
  id: number;
  vote_average: number;
  video: number;
  overview: string;
  release_date: string;
  title: string;
  popularity: number;
  character: string;
  credit_id: string;
  order: number;
};

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

// interface CrewCreditWithStats extends CrewCredit {

// }

type CastCredit = {
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
type GenreResponse = Array<NewGenreList>;

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

// User also has _id and __v.
type CreateUserReturn = {
  newUser: User;
  newMovielistUser: UserMovieList;
  newMovieCollectionUser: MovieCollectionResponse;
};

type MovieCollectionResponse = {
  email: string;
  _id: string;
  person?: {
    id: number;
    name: string;
  };
  moviecoll: UserMovieCollection;
};
