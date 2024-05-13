let id = getParameterByName("id");
let message = getParameterByName("message");
let localStorageId = localStorage.getItem("selectedCityId");
let selectedCityId = id || localStorageId;

if (message) {
	alert(message);
}

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

document.getElementById("deleteCity").addEventListener("click", (event) => {
	event.preventDefault();
	let confirm = window.confirm(
		"Are you sure you want to delete this city? (Id: " + selectedCityId + ")"
	);
	if (confirm) {
		deleteCity(selectedCityId);
	}
});

document.getElementById("cityForm").addEventListener("submit", (event) => {
	event.preventDefault();

	let id = document.getElementById("id").value;

	let city = document.getElementById("city").value;
	let state = document.getElementById("state").value;
	let county = document.getElementById("county").value;
	let population = document.getElementById("population").value;
	let ranking = document.getElementById("ranking").value;
	let density = document.getElementById("density").value;
	let timezone = document.getElementById("timezone").value;
	let zips = document.getElementById("zips").value;
	let lat = document.getElementById("lat").value;
	let lng = document.getElementById("lng").value;

	let cityObject = {
		city: city,
		state: state,
		county: county,
		population: population,
		ranking: ranking,
		density: density,
		timezone: timezone,
		zips: zips,
		lat: lat,
		lng: lng,
	};

	putCity(id, cityObject);
});

document.getElementById("showCity").addEventListener("click", (event) => {
	event.preventDefault();
	document.getElementById("otherDetails").classList.remove("d-none");
	document.getElementById("cityForm").classList.add("d-none");
	document.getElementById("editCity").classList.remove("d-inline");
	document.getElementById("editCity").classList.add("d-none");
	document.getElementById("editCity").disabled = true;

	let city = JSON.parse(localStorage.getItem("selectedCity"));
	if (city) {
		loadStatePopulation(city);
	}
});

document.getElementById("topCloseButton").addEventListener("click", (event) => {
	event.preventDefault();
	hideModal();
});

document
	.getElementById("bottomCloseButton")
	.addEventListener("click", (event) => {
		event.preventDefault();
		hideModal();
	});

document.getElementById("cancelButton").addEventListener("click", (event) => {
	event.preventDefault();
	hideModal();
});

document
	.getElementById("cancelEditButton")
	.addEventListener("click", (event) => {
		event.preventDefault();
		window.location.reload();
	});

document.getElementById("editCity").addEventListener("click", (event) => {
	event.preventDefault();

	document.getElementById("saveCity").disabled = false;
	document.getElementById("showCity").classList.remove("d-inline");
	document.getElementById("showCity").classList.add("d-none");

	// let city = JSON.parse(localStorage.getItem("selectedCity"));

	document.getElementById("city").disabled = false;
	document.getElementById("state").disabled = false;
	document.getElementById("county").disabled = false;
	document.getElementById("population").disabled = false;
	document.getElementById("ranking").disabled = false;
	document.getElementById("density").disabled = false;
	document.getElementById("timezone").disabled = false;
	document.getElementById("zips").disabled = false;
	document.getElementById("lat").disabled = false;
	document.getElementById("lng").disabled = false;
});

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

document
	.getElementById("getOtherCitiesInThisState")
	.addEventListener("click", (event) => {
		event.preventDefault();
		loadCityStates(localStorage.getItem("selectedCityState"));
	});

document.getElementById("addToFavorites").addEventListener("click", (event) => {
	event.preventDefault();
	addToFavoritedInLocalStorage(
		JSON.parse(localStorage.getItem("selectedCity"))
	);
});

document
	.getElementById("removeFromFavorites")
	.addEventListener("click", (event) => {
		event.preventDefault();
		removeFromFavoritedInLocalStorage(
			JSON.parse(localStorage.getItem("selectedCity"))
		);
	});

const drawPoints = (lat, lng, color, size = 2, objRatio) => {
	//let sizeInLat = Math.abs(objRatio.maxlat - objRatio.minlat);
	//let sizeInLng = Math.abs(objRatio.maxlng - objRatio.minlng);

	let xRatio = 3 * (myCanvas.width / 360);
	let yRatio = 2 * (myCanvas.height / 180);

	let x = (lng + 180) * xRatio; //- Math.abs(sizeInLat);
	let y = (90 - lat) * yRatio; //- Math.abs(sizeInLng);

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
			
			let randomColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

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
					drawPoints(city.lat, city.lng, randomColor, 1, {
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
			
			setTimeout(() => {
				drawPoints(city.lat, city.lng, "red", 3, {
					minlat: city.lat - 0.1,
					maxlat: city.lat + 0.1,
					minlng: city.lng - 0.1,
					maxlng: city.lng + 0.1,
				});
			}, 1000);
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

const deleteCity = (id) => {
	let xhr = new XMLHttpRequest();

	xhr.open("DELETE", `api/cities/${id}`, true);

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				window.location.reload();
			} else {
				console.error("DELETE request failed.");
				console.error(xhr.responseText);
				alert(errorResult?.errorMessage || "Unknown error");
			}
		}
	};

	xhr.send();
};

const loadCity = (id) => {
	let url = urlPrefix + `api/cities/${id}`;

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
			
			document.title = `City: ${city.city}, ${city.state}`;
			
			document.getElementById("titleOfDetail").textContent = `City: ${city.city}, ${city.state}`;

			checkFavorited();

			// loadStatePopulation(city); // loadStatePopulation(city); // let city = JSON.parse(localStorage.getItem("selectedCity"));

			console.log("loadCity resolved at " + Date.now());

			//setTimeout(() => {
			//	drawPoints(city.lat, city.lng, "red", 3, {
			//		minlat: city.lat - 0.1,
			//		maxlat: city.lat + 0.1,
			//		minlng: city.lng - 0.1,
			//		maxlng: city.lng + 0.1,
			//	});
			//}, 2500);
		})
		.catch((error) => {
			document.getElementById("details").innerHTML = "City Not Found! Please try again.";
			document.getElementById("otherDetails").innerHTML = "";
			console.error("Error fetching city:", error);
			showCityNotFound();
			return;
		});

	console.log("loadCity finished at " + Date.now());
};

const hideModal = function() {
	const myModalEl = document.getElementById("myModal");
	myModalEl.style.display = "none";
};

const showModal = function(htmlContent) {
	const myModalEl = document.getElementById("myModal");
	const myModalBodyEl = document.getElementById("myModalBody");
	myModalBodyEl.innerHTML = "";
	const div = document.createElement("div");
	div.innerHTML = htmlContent;
	myModalBodyEl.appendChild(div);
	myModalEl.style.display = "block";
};

const showCityNotFound = () => {
	let html = `

			<div class="container">
			    <div class="row">
			        <div class="col">
			            <h1 class="text-danger">City Not Found! Please Try Again.</h1>
			        </div>
			    </div>
			</div>
			
			`;

	document.getElementById("details").innerHTML = html;
};

const putCity = (id, city) => {
	delete city.id;

	let xhr = new XMLHttpRequest();

	xhr.open("PUT", `api/cities/${id}`, true);

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				alert("City with id " + data.id + " updated.");
				window.location.reload();
			} else {
				console.error("PUT request failed.");
				console.error(xhr.responseText);
				alert(xhr?.responseText || "Unknown error");
			}
		}
	};

	let cityObjectJSON = JSON.stringify(city); // Convert JS object to JSON string

	console.log(cityObjectJSON);

	xhr.send(cityObjectJSON);
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
};

// NOTE: Since this like most of my script.js files are loaded defer, the DOM is ready and window.onload is not necessary

if (selectedCityId) {
	loadCity(selectedCityId);
}
