// Selecters
const loginForm = document.getElementById("loginForm");
// console.log(loginForm);

// The API URL
const apiUrl = "http://localhost:3000";

const queryString = window.location.search;
// console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const existingEmail = urlParams.get("existingEmail");
const registered = urlParams.get("registered");

if (existingEmail) {
  loginForm.email.value = existingEmail;
}

if (registered) {
  document.querySelector(".registered-alert").style.display = "block";
}

/**
 * Event handler for a form submit event.
 * @param {SubmitEvent} event
 */

loginForm.addEventListener("submit", (event) => {
  /**
   * This prevents the default behaviour of the browser submitting
   * the form so that we can handle things instead.
   */
  event.preventDefault();
  // console.log(event);
  // console.log("submited");

  // This gets the form data
  const givenUserData = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };
  // console.log(givenUserData);

  // POST request using fetch()
  fetch(apiUrl + "/login", {
    /**
     * The default method for a request with fetch is GET,
     * so we must tell it to use the POST HTTP method.
     */
    method: "POST",
    /**
     * These headers will be added to the request and tell
     * the API that the request body is JSON and that we can
     * accept JSON responses.
     */
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    /**
     * The body of our POST request is the JSON string that
     * we created above.
     */
    body: JSON.stringify(givenUserData),
  })
    .then((response) => {
      if (response.ok) {
        // Convert to JSON  and returned
        return response.json();
      } else {
        // throw new Error(response.statusText);
        throw new Error("Something went wrong");
      }
    }) // returns a promise allready
    .then((data) => {
      // Displaying results to console
      console.log(data);
      console.log(data.token);
      // save the token in the localStorage
      localStorage.setItem("token", data.token);
      location.href = "/";
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
});
