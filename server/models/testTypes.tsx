type UserMovieCollection = Array<Movie>;

type User = {
  email: String;
  password: String;
};

type UserMovieList = {
  email: String;
  movieList: Array<MovieExtended>;
  movieGenreRating: Array<MovieGenreRating>;
  userDirectors: Array<UserDirector>;
  userActors: Array<UserActors>;
};

// The type in the collection
type Movie = {
  collectionID: Number;
  inWatchlist: Boolean;
  seen: Boolean;
  user_rating: Number;
  poster_path: String;
  vote_average: Number;
  overview: String;
  release_date: String;
  title: String;
  id: Number;
  character: String;
};

// The type in the 'movielist'

interface MovieExtended extends Movie {
  backdrop_path: String;
  belongs_to_collection: TMDBCollection;
  budget: Number;
  genres: Array<Genre>;
  homepage: String;
  id: Number;
  imdb_id: String;
  original_language: String;
  original_title: String;
  popularity: Number;
  poster_path: String;
  release_date: String;
  revenue: Number;
  runtime: Number;
  tagline: String;
  title: String;
  video: Boolean;
  vote_count: Number;
  credits: Credits;
}

interface Genre {
  id: Number;
  name: String;
}

interface MovieGenreRating {
  movid: Number;
  genreId: Number;
  name: String;
  rating: Number;
}

interface UserDirector {
  movid: Number;
  id: Number;
  name: String;
  rating: Number;
}

interface UserActors {
  movid: Number;
  id: Number;
  name: String;
  rating: Number;
}

interface TMDBCollection {
  id: Number;
  name: String;
  poster_path: String;
  backdrop_path: String;
}

interface Credits {
  cast: Array<Cast>;
  crew: Array<Crew>;
}

interface Cast extends Credit {
  character: String;
  order: Number;
}

interface Crew extends Credit {
  department: String;
  job: String;
}

interface Credit {
  id: Number;
  known_for_department: String;
  name: String;
  credit_id: String;
}

/* 
  API types
  
*/

interface Person {
  id: Number;
  known_for_department: string | null;
  popularity: Number;
}

interface OnLoadResponse {
  user: UserMovieList;
  actors: Array<CreditFromAPI>;
  directors: Array<CreditFromAPI>;
}

type CreditFromAPI = {
  adult: Boolean;
  backdrop_path: String;
  genre_ids: Array<Number>;
  original_language: String;
  original_title: String;
  poster_path: String;
  vote_count: Number;
  id: Number;
  vote_average: Number;
  video: Number;
  overview: String;
  release_date: String;
  title: String;
  popularity: Number;
  character: String;
  credit_id: String;
  order: Number;
};

type APIMovieWithGenre = {
  adult: Boolean;
  backdrop_path: String;
  genre_ids: Array<Number>;
  id: Number;
  original_language: String;
  original_title: String;
  overview: String;
  popularity: Number;
  poster_path: String;
  release_date: String;
  title: String;
  video: Boolean;
  vote_average: Number;
  vote_count: Number;
};

// Could have the genre as a key?
type NewGenreResponse = {
  genreName: String;
  movies: Array<APIMovieWithGenre>;
};
