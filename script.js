// Selectors

// fetch movies data from (TMDb) API

function fetchMovies(url, element_selector, path_type) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // throw new Error(response.statusText);
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      // console.log(data);
      showMovies(data.results, element_selector, path_type);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

//  Event Listener and Functions

//  Add Movies to the front end

function showMovies(movies, element_selector, path_type) {
  // console.log(movies);
  // console.log(element_selector);
  // console.log(path_type);

  const moviesEl = document.querySelector(element_selector);
  movies.forEach((movie) => {
    const image = `<img src=https://image.tmdb.org/t/p/original${movie[path_type]} alt = "img" >`;

    // console.log(image);
    moviesEl.innerHTML += image;
  });
}

function getOriginalsMovies() {
  const url =
    "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213";
  fetchMovies(url, ".original__movies", "poster_path");
}

function getTrendingNowMovies() {
  const url =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045";
  fetchMovies(url, ".TredingNow__movies", "backdrop_path");
}

function getTopRatedMovies() {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";
  fetchMovies(url, ".topRated__movies", "backdrop_path");
}

// function getMyListMovies() {
// 	const url =
// 			"https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";
// 	fetchMovies(url, ".myList__movies", "backdrop_path");
// }

// function call

window.onload = () => {
  getOriginalsMovies();
  getTrendingNowMovies();
  getTopRatedMovies();
};
