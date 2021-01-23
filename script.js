// Called whe the page is loaded

window.onload = () => {
  getOriginalsMovies();
  getTrendingNowMovies();
  getTopRatedMovies();
  getGenres();
};

// Functions and Event Listener

async function getMovieTrailer(id) {
  // read our JSON
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`;

  // wait until the promise resolves (*)
  return await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      // throw new Error (response.statusText);
      throw new Error("Something went wrong");
    }
  });
}

const setTrailer = (trailers) => {
  const iframe = document.getElementById("movieTrailer");
  const movieNotFound = document.querySelector(".movieNotFound");
  if (trailers.length > 0) {
    movieNotFound.classList.add("d-none");
    iframe.classList.remove("d-none");
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`;
  } else {
    iframe.classList.add("d-none");
    movieNotFound.classList.remove("d-none");
  }
};

const handleMovieSelection = (e) => {
  const id = e.target.getAttribute("data-id");
  const iframe = document.getElementById("movieTrailer");
  // here we need the id of the movie
  getMovieTrailer(id).then((data) => {
    const results = data.results;
    const youtubeTrailers = results.filter((result) => {
      if (result.site == "YouTube" && result.type == "Trailer") {
        return true;
      } else {
        return false;
      }
    });
    setTrailer(youtubeTrailers);
  });

  // open modal
  $("#trailerModal").modal("show");
  // we need to call the api with the ID
};

//  Add Movies to the front end

function showMovies(movies, element_selector, path_type) {
  // console.log(movies);
  // console.log(element_selector);
  // console.log(path_type);
  // console.log(movie.results);

  const moviesEl = document.querySelector(element_selector);

  for (let movie of movies.results) {
    // console.log(movie.results);
    const imageElement = document.createElement("img");
    imageElement.setAttribute("data-id", movie.id);
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;
    // console.log(imageElement);

    // Event Listener to each image on click
    imageElement.addEventListener("click", (e) => {
      handleMovieSelection(e);
    });

    moviesEl.appendChild(imageElement);
  }
}

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
      showMovies(data, element_selector, path_type);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

function fetchMoviesBasedOnGenre(genreId) {
  let url = "https://api.themoviedb.org/3/discover/movie?";

  url +=
    "api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2";

  url += `&with_genres=${genreId}`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("something went wrong");
    }
  }); // returns a promise already
}

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
      showMovies(data, element_selector, path_type);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

// fetch movies Based genres from (TMDb) API

function fetchMoviesBasedOnGenre(genreId) {
  let url = "https://api.themoviedb.org/3/discover/movie?";

  url +=
    "api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

  url += `&with_genres=${genreId}`;

  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("something went wrong");
    }
  }); // returns a promise already
}

// fetch movies genres from (TMDb) API

function getGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=92bcc12799d8068995c7c9650f414f3e&language=en-US`;

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
      // object with List of official genres for movies
      // console.log(data);
      showMoviesGenres(data);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

// show Movies to the front end based on their genres

function showMoviesBasedOnGenre(genreName, movies) {
  // console.log(movies);
  // console.log(genreName);

  let allMovies = document.querySelector(".movies");

  let genreEl = document.createElement("div");
  genreEl.classList.add("movies__header");
  genreEl.innerHTML = `<h2>${genreName}</h2>`;

  let moviesEl = document.createElement("div");
  moviesEl.classList.add("movies__container");
  moviesEl.setAttribute("id", genreName);

  for (let movie of movies.results) {
    let imageElement = document.createElement("img");

    // let { backdrop_path, id } = movie;
    // console.log("TESTING DESCONSTRUCT:", id, backdrop_path);
    // imageElement.setAttribute("data-id", id);
    // imageElement.src = `https://image.tmdb.org/t/p/original${backdrop_path}`;

    imageElement.src = `https://image.tmdb.org/t/p/original${movie["backdrop_path"]}`;

    imageElement.addEventListener("click", (e) => {
      handleMovieSelection(e);
    });
    moviesEl.appendChild(imageElement);
  }

  allMovies.appendChild(genreEl);
  allMovies.appendChild(moviesEl);
}

function showMoviesGenres(genres) {
  // console.log(genres);

  genres.genres.forEach(function (genre) {
    // console.log(genre);

    // get list of movies
    let movies = fetchMoviesBasedOnGenre(genre.id);

    // now we have the movies based on genres ready
    movies
      .then(function (movies) {
        // console.log(movies);
        showMoviesBasedOnGenre(genre.name, movies);
      })
      .catch(function (error) {
        console.log("BAD BAD", error);
      });
    // show movies based on genre
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

// the list of official genres for movies.
// https://api.themoviedb.org/3/genre/movie/list?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US

// movies genres
// https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=53
