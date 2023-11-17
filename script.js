const tmdbKey = 'aafbb96c43c45f5b4212f8984e69d842';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list"
  let requestParams = `?api_key=${tmdbKey}`
  let urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json(); 
      //console.log(jsonResponse);
      const genres = jsonResponse.genres;
      //console.log(genres);
      return genres;
    }
    throw new Error("Genere request failure");
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  let requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
  let urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse)
      const movies = jsonResponse.results;
      //console.log(movies);
      return movies;
    }
    throw new Error("Get movie request failed");
  } catch(error) {
    console.log(Error);
  }
};

const getMovieInfo = async (movie) => {
  let movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  let requestParams = `?api_key=${tmdbKey}`
  let urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
    throw new Error("Get movie request failed");
  } 
  catch(error) {
    console.log(Error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  let movies = await getMovies();
  let randomMovie = getRandomMovie(movies);
  let info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
//getMovies();
//getMovieInfo();
playBtn.onclick = showRandomMovie;
