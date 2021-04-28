/**
 * Steps
 * (FRONDEND)
 * Put in information
 * Click Register
 * Grab the data from the form
 * post request to API
 * (BACKEND)
 * Check if user already exists on API
 * If user does not exist , registered in dataBase
 *     Return 200 ok Status
 *     Redirect to Login page
 * If user does exist
 *     Return 400 Status
 *     Notfiy front end of user existing
 *    Redirect to Login page
 *
 * @format
 */

// selector
let registerForm = document.getElementById("registerForm");

// the API URL
let apiUrl = "http://localhost:3000";

/**
 * Event handler for a form submit event.
 * @param {SubmitEvent} event
 */

registerForm.addEventListener("submit", (e) => {
	/**
	 * This prevents the default behaviour of the browser submitting
	 * the form so that we can handle things instead.
	 */
	e.preventDefault();

	// This gets the form data
	let payload = {
		name: registerForm.name.value,
		email: registerForm.email.value,
		password: registerForm.password.value,
	};

	// call PAI for Fetch only if we have user email and password
	if (payload.email && payload.password) {
		// POST request using fetch()
		fetch(apiUrl + "/api/users/signup", {
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
			},
			/**
			 * The body of our POST request is the JSON string that
			 * we created above.
			 */
			body: JSON.stringify(payload),
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
				location.href = `/login.html?existingEmail=${payload.email}&registered=true`;
			})
			.catch((error) => {
				// console.log("Eror happened");
				alert("already register");
				// redirect user to the login page
				location.href = `/login.html?existingEmail=${payload.email}`;
				// console.log("Fetch Error :-S", error);
			});
	}
});
