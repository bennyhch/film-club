/* 
  normal
  in watchlist
  seen

  Abnormal:
  missing field
  etc.
*/


//////////////////////////////////////
// 200 Movies
export const mockMovie = {
  collectionID: 1234,
  inWatchlist: false,
  seen: false,
  user_rating: null,
  poster_path: '',
  vote_average: 4,
  overview: 'A film about things',
  release_date: new Date('01/01/2022').toUTCString(),
  title: 'The Film',
  id: 100
};

export const mockMovies = [];
for (let i = 1; i < 201; i++) {
  const copy = {};
  Object.assign(copy, mockMovie);
  copy.id = i;
  mockMovies.push(copy); 
}

export const mockMovieInWatchlist = {
  collectionID: 1234,
  inWatchlist: true,
  seen: false,
  user_rating: null,
  poster_path: '',
  vote_average: 4,
  overview: 'A film about things',
  release_date: new Date('01/01/2022').toUTCString(),
  title: 'The Film',
  id: 100
};

export const mockMovieSeen = {
  collectionID: 1234,
  inWatchlist: true,
  seen: true,
  user_rating: null,
  poster_path: '',
  vote_average: 4,
  overview: 'A film about things',
  release_date: new Date('01/01/2022').toUTCString(),
  title: 'The Film'
}

//////////////////////////////////////
// Director

export const director =  {
  credit_id: 5,
  release_date: new Date('01/01/2021').toUTCString(),
  vote_count: 10,
  video: false,
  adult: false,
  vote_average: 5,
  title: 'A movie a director directed',
  genre_ids: [123, 234, 345],
  original_title: 'A movie an director directed',
  popularity: 50,
  id: 11,
  backdrop_path: '',
  overview: 'A director directed this',
  poster_path: '',
  inWatchlist: false,
  seen: false,
  user_rating: null,
  name: 'Di Directorson',
  job: 'Director',
  department: 'Directing'
}

const directorsonList = [];
for (let i = 1; i < 6; i++) {
  const copy = {};
  Object.assign(copy, director);
  copy.id = i;
  directorsonList.push(copy);
}

export const directorList = {
  directorName: 'Di Directorson',
  movies: Array(4).fill(directorsonList),
}


////////////////////////////
////////// Actor
export const actor =  {
  credit_id: 1,
  release_date: new Date('01/01/2021').toUTCString(),
  vote_count: 10,
  video: false,
  adult: false,
  vote_average: 5,
  title: 'A movie an actor was in',
  genre_ids: [123, 234, 345],
  original_title: 'A movie an actor was in',
  popularity: 50,
  id: 10,
  backdrop_path: '',
  overview: 'The actor was in this movie',
  poster_path: '',
  inWatchlist: false,
  seen: false,
  user_rating: null,
  character: 'John Smith'
}
const tomCruiseList = [];
for (let i = 1; i < 6; i++) {
 const copy = {};
 Object.assign(copy, actor);
 copy.id = i;
 tomCruiseList.push(copy);
}

export const actorList = {
  actorName: 'Tom Cruise',
  movies: tomCruiseList
}

//////////////////////////////////////
// Genre
const movieWithGenre = {
  collectionID: 20 ,
  inWatchlist: true,
  seen: true,
  user_rating: null,
  poster_path: '',
  vote_average: 4,
  overview: 'An action film',
  release_date: new Date('01/01/2022').toUTCString(),
  title: 'Action Film',
  id: 1
}

const actionMovies = [];
for (let i = 1; i < 6; i++) {
  const copy = {};
  Object.assign(copy, movieWithGenre);
  copy.id = i
  actionMovies.push(copy);
}

export const genreList = {
  genreName: 'Action',
  movies: actionMovies
}

const movieGenreRatings = [
  {
    movid: 1,
    id: 1,
    name: 'First Film',
    rating: 5,
  }
];
const movieDirectorRatings = [
  {
    movid: 2,
    id: 2,
    name: 'Second Film',
    rating: 4,
  }
];
const movieActorRatings = [
  {
    movid: 3,
    id: 3,
    name: 'Third Film',
    rating: 3,
  }
];

export const userMovieList = {
  email: 'email2',
  _id: 1,
  movieList: [mockMovieInWatchlist, mockMovieSeen],
  genres: movieGenreRatings,
  directors: movieDirectorRatings,
  actors: movieActorRatings
}

export const mockHomeProps = {
  actors: [actorList],
  directors: [directorList],
  genres: [genreList],
  movies: mockMovies,
  userMovieList: [mockMovieInWatchlist, mockMovieSeen],
  userActorList: movieActorRatings,
  userDirectorlist: movieDirectorRatings,
  userGenreList: movieGenreRatings,
  watchlistMovies: [mockMovieInWatchlist, () => {}],
  watchedMovies: [mockMovieSeen],
  addWatchlistFromHome: (filmToAdd) => filmToAdd,
  addWatchedFromHome: (element, userRating) => ({element: element, userRating: userRating}),
  deleteMovieFromHome: (element) => element
}
