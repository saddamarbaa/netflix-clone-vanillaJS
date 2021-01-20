const myListMovies = document.querySelector(".myList__movies");

//  Event Listener and Functions

//  Add Movies to the front end

function addMovies(movies) {
  // Selectors
  const originalMovies = document.querySelector(".original__movies");
  // console.log(movies);
  // console.log(movie.backdrop_path);
  // console.log(originalMovies);

  movies.forEach((movie) => {
    const image = `<img src=https://image.tmdb.org/t/p/original${movie.poster_path} alt = "img" >`;

    // console.log(image);
    originalMovies.innerHTML += image;
  });
}

function showTredingNowMovie(movies) {
  //  Selector
  const tredingNowMovies = document.querySelector(".TredingNow__movies");
  // console.log(movies);
  // console.log(movie.backdrop_path);

  movies.forEach((movie) => {
    const image = `<img src=https://image.tmdb.org/t/p/original${movie.backdrop_path} alt = "img" >`;

    // console.log(image);
    tredingNowMovies.innerHTML += image;
  });
}

function showTopRatedMovies(movies) {
  //  Selectors
  const topRatedMovies = document.querySelector(".topRated__movies");
  // console.log(movies);
  // console.log(movie.backdrop_path);

  movies.forEach((movie) => {
    const image = `<img src=https://image.tmdb.org/t/p/original${movie.backdrop_path} alt = "img" >`;

    // console.log(image);
    topRatedMovies.innerHTML += image;
  });
}

function fetchMovies() {
  fetch(
    "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213"
  )
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
      addMovies(data.results);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

function getTredingNowMovies() {
  fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213"
  )
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
      showTredingNowMovie(data.results);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

function getTopRatedMovies() {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1"
  )
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
      showTopRatedMovies(data.results);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

function getTredingNowMovies() {
  fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213"
  )
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
      showTredingNowMovie(data.results);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

// function call

window.onload = () => {
  fetchMovies();
  getTredingNowMovies();
  getTopRatedMovies();
};
