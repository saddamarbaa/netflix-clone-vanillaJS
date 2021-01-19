//  Selectors

const originalMovies = document.querySelector(".original__movies");
const tredingNowMovies = document.querySelector(".TredingNow__movies");
const topRatedMovies = document.querySelector(".topRated__movies");
const myListMovies = document.querySelector(".myList__movies");

// console.log(originalMovies);
// console.log(tredingNowMovies);
// console.log(topRatedMovies);
// console.log(myListMovies);

// let img1 = `<img
// src="https://occ-0-64-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTNtbTme6kjhQ5E_4UG-98Aar9knOv6iGoVle_WQ8Ik26Zd9QIhXworg3IbCij348hy9E9RqvXI0TVS7NaKBQ6NcOXCY_nc8Snk4ob4QpGCX5vRNXR1ZdwFHlYC1.jpg?r=909"
// alt="original__movies"
// ></img>`;

// let img2 = `  <img
// src="https://occ-0-64-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABdl4tSD3mYVstPPRTUw66gYsDWSFEjb0zidksP4exUcGNQ2KHSKuxyV4wzJQFqvh2EVT-ay3p__njM6smgfCtTYylCM.jpg?r=4e5"
// alt="original__movies">`;

// let img3 = `<img src="https://cdn57.androidauthority.net/wp-content/uploads/2019/12/tall-girl-movie-image.jpg"
// alt="original__movies">`;

// let img4 = ` <img
// src="https://occ-0-64-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABREjGfvO2NFXWWJEUI_SYKs95sva-C80Rip6CcllHUm4Jbvm-8-i5VHtchn59Wrq1mr2MmC3hoF7nzB6sUX94YSwdqE.jpg?r=747"
// alt="original__movies">`;

//  Event Listener and Functions

//  Add Movies to the front end

function addMovies(movies, moveEl) {
  console.log(movies);
  for (const movie of movies.results) {
    const img = `<img src=https://image.tmdb.org/t/p/original${movie.backdrop_path}>`;

    moveEl.innerHTML += img;
    console.log(img);
  }
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
        throw new Error("Something went wrong ");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

// function call

window.onload = () => {
  fetchMovies();
  fetchMovies();
  // addMovies(originalMovies, img1);
  // addMovies(tredingNowMovies, img2);
  // addMovies(topRatedMovies, img3);
  // addMovies(myListMovies, img4);
};
