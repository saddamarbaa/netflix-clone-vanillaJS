//  Selectors

const originalMovies = document.querySelector(".original__movies");
const tredingNowMovies = document.querySelector(".TredingNow__movies");
const topRatedMovies = document.querySelector(".topRated__movies");
const myListMovies = document.querySelector(".myList__movies");

// console.log(originalMovies);
// console.log(tredingNowMovies);
// console.log(topRatedMovies);
// console.log(myListMovies);

//  Event Listener and Functions

//  Add Movies to the front end

function addMovies(movies, moveEl) {
  // console.log(movies);
  // console.log(movie.backdrop_path);

  movies.forEach((movie) => {
    const image = `<img src=https://image.tmdb.org/t/p/original${movie.backdrop_path} alt = "img" >`;

    // console.log(image);
    moveEl.innerHTML += image;
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
      // call add function and pass movies arra
      addMovies(data.results, tredingNowMovies);
      addMovies(data.results, originalMovies);
      addMovies(data.results, topRatedMovies);
      addMovies(data.results, myListMovies);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

// function call

window.onload = () => {
  fetchMovies();
};
