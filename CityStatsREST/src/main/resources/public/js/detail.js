let id = getParameterByName("id");

console.log(id);

let localStorageId = localStorage.getItem("selectedCityId");

console.log(localStorageId);

let selectedCityId = id || localStorageId;

function checkIfFavoritedInLocalStorage(city) {
	let cityId = city.id;
	let testObj = JSON.parse(localStorage.getItem(`_cityFavorites`));
	if (testObj) {
		if (testObj[cityId]) {
			return testObj[cityId];
		}
	} else {
		localStorage.setItem(`_cityFavorites`, JSON.stringify({}));
	}
}

function addToFavoritedInLocalStorage(city) {
	let testObj = JSON.parse(localStorage.getItem(`_cityFavorites`));
	if (testObj) {
		city.favoritedOn = new Date().toLocaleString();
		testObj[city.id] = city;
		localStorage.setItem(`_cityFavorites`, JSON.stringify(testObj));
		checkFavorited();
	} else {
		localStorage.setItem(`_cityFavorites`, JSON.stringify({}));
	}
}

function removeFromFavoritedInLocalStorage(city) {
	let testObj = JSON.parse(localStorage.getItem(`_cityFavorites`));
	if (testObj) {
		delete testObj[city.id];
		localStorage.setItem(`_cityFavorites`, JSON.stringify(testObj));
		checkFavorited();
	} else {
		localStorage.setItem(`_cityFavorites`, JSON.stringify({}));
	}
}

function formatNumberWithCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const myCanvas = document.getElementById("stateCanvas");
const ctx = myCanvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);



document.getElementById("getOtherCitiesInThisState").addEventListener("click", (event) => {
	event.preventDefault();
	loadCityStates(localStorage.getItem("selectedCityState"));
})

document.getElementById("addToFavorites").addEventListener("click", (event) => {
	event.preventDefault();
	addToFavoritedInLocalStorage(JSON.parse(localStorage.getItem("selectedCity")));
});

document.getElementById("removeFromFavorites").addEventListener("click", (event) => {
	event.preventDefault();
	removeFromFavoritedInLocalStorage(JSON.parse(localStorage.getItem("selectedCity")));
});

const drawPoints = (lat, lng, color, size = 2, objRatio) => {

	let sizeInLat = Math.abs(objRatio.maxlat - objRatio.minlat);
	let sizeInLng = Math.abs(objRatio.maxlng - objRatio.minlng);

	//console.log(sizeInLat, sizeInLng);

	// NOTE: HARD CODED FACTORS, LOSES SMALL PARTS OF ALASKA AND HAWAII DUE TO LAT/LNG RATIO ON PURPOSE
	let xRatio = 3 * (myCanvas.width / 360); // NOTE: HARD CODED 3 (USA Country only in world map lat/lng)
	let yRatio = 2 * (myCanvas.height / 180); // NOTE: HARD CODED 2 (USA Country only in world map lat/lng)

	let x = (lng + 180) * xRatio; //- Math.abs(sizeInLat);
	let y = (90 - lat) * yRatio; //- Math.abs(sizeInLng);

	//console.log(x + " " + y);

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
				} else {
					drawPoints(city.lat, city.lng, "grey", 1, {
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
					div.innerHTML = `<h2>Population of ${city.state
						} is ${formatNumberWithCommas(sumpop)}</h2>`;
					document.getElementById("statePopulation").innerHTML = "";
					document.getElementById("statePopulation").appendChild(div);
				}
			}
			loadStatePoints(city.state);
		})
		.catch((error) => console.error("Error fetching city:", error));
};

const loadCityStates = (selectedCityState) => {
	let url = urlPrefix + `api/cities/states/${selectedCityState}`;
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
		})
		.catch((error) => console.error("Error fetching city:", error));
};

const loadCity = (id) => {
	let url = urlPrefix + `api/cities/${id}`;
	console.log("loadCity started at " + Date.now());
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			let city = data;
			localStorage.setItem("selectedCityState", city.state);
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
			localStorage.setItem("selectedCity", JSON.stringify(city));
			checkFavorited();
			loadStatePopulation(city);
			console.log("loadCity resolved at " + Date.now());

			setTimeout(() => {
				drawPoints(city.lat, city.lng, "red", 3, {
					minlat: city.lat - 0.1,
					maxlat: city.lat + 0.1,
					minlng: city.lng - 0.1,
					maxlng: city.lng + 0.1,
				});
			}, 1500);
		})
		.catch((error) => console.error("Error fetching city:", error));

	console.log("loadCity finished at " + Date.now());
};

const checkFavorited = () => {
	let city = JSON.parse(localStorage.getItem("selectedCity"));
	let resultIsInLocalFavorites = checkIfFavoritedInLocalStorage(city);
	if (resultIsInLocalFavorites) {
		document.getElementById("addToFavorites").style.display = "none";
		document.getElementById("removeFromFavorites").style.display = "block";
	} else {
		document.getElementById("addToFavorites").style.display = "block";
		document.getElementById("removeFromFavorites").style.display = "none";
	}
}

if (selectedCityId) {
	loadCity(selectedCityId);

	//cityUtility.loadCity(selectedCityId, (data) => {
	//	console.log("Callback from loadCity");
	//	console.log(data);
	//
	//	return data;
	//});

}
