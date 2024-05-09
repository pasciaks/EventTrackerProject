let id = getParameterByName("id");

console.log(id);

let localStorageId = localStorage.getItem("selectedCityId");

console.log(localStorageId);

let selectedCityId = id || localStorageId;

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const myCanvas = document.getElementById("stateCanvas");
const ctx = myCanvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

const drawPoints = (lat, lng, color, size = 2, objRatio) => {
  console.log(objRatio);
  let sizeInLat = Math.abs(objRatio.maxlat - objRatio.minlat);
  let sizeInLng = Math.abs(objRatio.maxlng - objRatio.minlng);

  console.log(sizeInLat, sizeInLng);

  // NOTE: HARD CODED FACTORS, LOSES SMALL PARTS OF ALASKA AND HAWAII DUE TO LAT/LNG RATIO ON PURPOSE
  let xRatio = 3 * (myCanvas.width / 360); // NOTE: HARD CODED 3 (USA Country only in world map lat/lng)
  let yRatio = 2 * (myCanvas.height / 180); // NOTE: HARD CODED 2 (USA Country only in world map lat/lng)

  let x = (lng + 180) * xRatio; //- Math.abs(sizeInLat);
  let y = (90 - lat) * yRatio; //- Math.abs(sizeInLng);

  console.log(x + " " + y);

  ctx.fillStyle = color;
  ctx.fillRect(x - size, y - size, 2 * size, 2 * size);
};

const loadStatePoints = (state) => {
  //let url = urlPrefix + `api/cities/coordinates?city=${city}`;
  let url = urlPrefix + `api/cities/coordinates`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let minlat = 9999;
      let maxlat = -9999;
      let minlng = 9999;
      let maxlng = -9999;

      // NOTE: ALASKA has lng that spans - values and + values crossing the 180th meridian, problematic for this simple map

      data.forEach((city) => {
        if (city.state === state) {
          let lat = city.lat;
          let lng = city.lng;

          if (lat < minlat) {
            minlat = lat;
          }
          if (lat > maxlat) {
            maxlat = lat;
          }
          if (lng < minlng) {
            minlng = lng;
          }
          if (lng > maxlng) {
            maxlng = lng;
          }
        }
      });

      data.forEach((city) => {
        if (city.state === state) {
          drawPoints(city.lat, city.lng, "black", 2, {
            minlat,
            maxlat,
            minlng,
            maxlng,
          });
        }
      });
    })
    .catch((error) => console.error("Error fetching cities:", error));
};

const loadStatePopulation = (city) => {
  let url = urlPrefix + `api/cities/sumpop`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let statePopulations = data;
      console.log(statePopulations);
      for (let i = 0; i < statePopulations.length; i++) {
        if (statePopulations[i][0] === city.state) {
          let sumpop = statePopulations[i][1];
          let div = document.createElement("div");
          div.innerHTML = `<h2>Population of ${
            city.state
          } is ${formatNumberWithCommas(sumpop)}</h2>`;
          document.getElementById("statePopulation").innerHTML = "";
          document.getElementById("statePopulation").appendChild(div);
        }
      }
      loadStatePoints(city.state);
    })
    .catch((error) => console.error("Error fetching city:", error));
};

const loadCityStates = (city) => {
  let url = urlPrefix + `api/cities/states/${city.state}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let cities = data;
      tableUtility.hiddenColumns = [
        "ranking",
        "density",
        "timezone",
        "zips",
        "lat",
        "lng",
      ];
      tableUtility.clickHandler = (event) => {
        event.preventDefault();
        event.preventDefault();
        let cityId = Number(event.target.parentElement.getAttribute("data-id"));
        console.log("You clicked on a table row! The city ID is:" + cityId);
        localStorage.setItem("selectedCityId", cityId);
        window.location.href = `detail.html?id=${cityId}`;
      };
      let table = tableUtility.createTable(cities, "id");
      document.getElementById("citiesInThisState").innerHTML = "";
      document.getElementById("citiesInThisState").appendChild(table);
      loadStatePopulation(city);
    })
    .catch((error) => console.error("Error fetching city:", error));
};

const loadCity = (id) => {
  let url = urlPrefix + `api/cities/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let city = data;
      localStorage.setItem("selectedCity", city);
      console.log(city);
      document.getElementById("id").value = city.id;
      document.getElementById("city").value = city.city;
      document.getElementById("state").value = city.state;
      document.getElementById("county").value = city.county;
      document.getElementById("population").value = city.population;
      document.getElementById("ranking").value = city.ranking;
      document.getElementById("density").value = city.density;
      document.getElementById("timezone").value = city.timezone;
      document.getElementById("zips").value = city.zips;
      document.getElementById("lat").value = city.lat;
      document.getElementById("lng").value = city.lng;
      loadCityStates(city);
    })
    .catch((error) => console.error("Error fetching city:", error));
};

if (selectedCityId) {
  loadCity(selectedCityId);
}
