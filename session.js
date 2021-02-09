// in login page
// Check if token is available
// if token is available take the  redirect user to the home page
// in home page also
// Check if token is available
// if token is  not available take redirect user to login page

const checkIfLoggedIn = () => {
  const currentToken = localStorage.getItem("token");
  if (currentToken) {
    if (
      location.href.includes("/login.html") ||
      location.href.includes("/register.html")
    ) {
      location.href = "/";
    }
  } else {
    // If I am currently not logged in
    // And trying to acceess a unauthorized page
    // (Trying to access all pages besides login)
    if (
      !location.href.includes("/login.html") &&
      !location.href.includes("/register.html")
    ) {
      location.href = "/login.html";
    }
  }
};

// first remove the token from localStorage and then redirect
// user to go lgoin page for sigin in
const logOut = () => {
  localStorage.removeItem("token");
  location.href = "/login.html";
};

checkIfLoggedIn();
