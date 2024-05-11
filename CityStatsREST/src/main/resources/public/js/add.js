let onCityFormSubmit = function (event) {
  event.preventDefault();

  let form = document.getElementById("cityForm");

  let city = {
    city: form.city.value,
    state: form.state.value,
    county: form.county.value,
    lat: form.lat.value,
    lng: form.lng.value,
    population: form.population.value,
    density: form.density.value,
    timezone: form.timezone.value,
    ranking: form.ranking.value,
    zips: form.zips.value,
  };

  postCity(city);

  return true;
};

const postCity = (city) => {
  let xhr = new XMLHttpRequest();

  xhr.open("POST", "api/cities", true);

  xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status == 200 || xhr.status == 201) {
        let data = JSON.parse(xhr.responseText);
        document.getElementById("cityForm").reset();
        window.location.href =
          "detail.html?id=" + data.id + "&message=City added successfully.";
      } else {
        console.error("POST request failed.");
        console.error(xhr.status + ": " + xhr.responseText);
        alert(
          "Please validate your submission details, an error has occurred\n\n" +
            xhr.status +
            ": " +
            xhr.responseText
        );
      }
    }
  };

  let cityObjectJSON = JSON.stringify(city); // Convert JS object to JSON string

  console.log(cityObjectJSON);

  xhr.send(cityObjectJSON);
};

/*

Create a new event ***

On the main page there should be a form that allows you to create a new entity. 
This form can be hard coded into your HTML document. 
When the submit button is pressed it should build a JSON object from the form field valuse, 
and send it to your POST route. If the request is successful, 
reload your list of all the events so it includes your newly created object.

Update and delete ***

Once the table is built, if a row is clicked on, a detail view for just that one entity should be displayed. 
You will accomplish this by adding a click event listener to each row of your table.
In the detail view you should have a form giving you the option to edit the entity, 
and a delete button that would delete the current entity and reload the view all view.


Add data aggregation *** ( State Population for Selected City's State )

Once your presentation for CRUD is working, add a function that uses the response 
data to present the data in some other form (For instance, total all of the hours 
you worked and calculate the amount of money you are owed. This would involve retrieving 
all of the "PunchCard" records, totaling their values, and displaying the total multiplied 
times your hourly rate somewhere on the page.)

*/

window.addEventListener("load", function () {
  configureEventListeners();
});

const configureEventListeners = () => {
  document
    .getElementById("cityForm")
    .addEventListener("submit", onCityFormSubmit);
};
