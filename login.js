// Selecters

const loginForm = document.getElementById("loginForm");
// console.log(loginForm);

// the API URL
const apiUrl = "http://localhost:3000";

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
    })
    .then((data) => {
      // Displaying results to console
      console.log(data);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
});
