

const fnFilterForPopulationEqualTo = (data, population) => {
	data = data.filter((item) => {
		return Number(item.population) === Number(population);
	});
	return data;
};

const fnFilterForPopulationGreaterThan = (data, population) => {
	data = data.filter((item) => {
		return Number(item.population) >= Number(population);
	});
	return data;
};

const fnRemoveUnwantedProperties = (data, arrayOfProperties) => {
	tableUtility.hiddenColumns = arrayOfProperties;
	return data;
};

const fnSortByCustomSorter = (data, sorter) => {
	data = data.sort(sorter);
	return data;
};

const fnCustomSortByLargestPopulation = (a, b) => {
	return b.population - a.population;
};

const fnCustomSortByCityName = (a, b) => {
	return a.city.localeCompare(b.city);
};

const fnFilterForCityName = (data, cityName) => {
	data = data.filter((item) => {
		return item.city.toLowerCase().indexOf(cityName.toLowerCase()) > -1;
	});
	return data;
};

const fnFilterForStateName = (data, stateName) => {
	data = data.filter((item) => {
		return item.state.toLowerCase().indexOf(stateName.toLowerCase()) > -1;
	});
	return data;
};

const fnSuccess = (data) => {

	if (!data || data.length === 0) {
		data = [];
	}

	let populationLimit = 0;

	if (getParameterByName("population")) {
		if (getParameterByName("population") === "-1") {
			data = fnFilterForPopulationEqualTo(data, 0);
		} else {
			populationLimit = Number(getParameterByName("population"));
			data = fnFilterForPopulationGreaterThan(data, Number(populationLimit));
		}
	} else {
		populationLimit = 1000000;
		data = fnFilterForPopulationGreaterThan(data, Number(populationLimit));
	}

	data = fnFilterForCityName(data, getParameterByName("cityName"));

	data = fnFilterForStateName(data, getParameterByName("stateName"));

	data = fnRemoveUnwantedProperties(data, ["zips", "ranking"]);

	let sort = getParameterByName("sort");

	switch (sort) {
		case "city":
			data = fnSortByCustomSorter(data, fnCustomSortByCityName);
			break;
		case "population":
			data = fnSortByCustomSorter(data, fnCustomSortByLargestPopulation);
			break;
		default:
			data = fnSortByCustomSorter(data, function(a, b) {
				return a.id - b.id;
			});
			break;
	}

	const actionHandler = function() {
		let specialDataSet = document.getElementById("specialDataSet");
		let cityId = specialDataSet.getAttribute("data-id");
		localStorage.setItem("selectedCityId", cityId);
		// alert(
		//   "You clicked the action button! The city ID is: " +
		//     specialDataSet.getAttribute("data-id")
		// );
		hideModal();
		//window.location.href = `detail.html?id=${cityId}`;
		window.location.href = `detail.html`;
	};

	const hideModal = function() {
		const myModalEl = document.getElementById("myModal");
		var dismissButtons = myModalEl.querySelectorAll(
			'[data-bs-dismiss="modal"]'
		);
		dismissButtons.forEach(function(button) {
			button.removeEventListener("click", hideModal);
		});
		myModalEl
			.querySelector("#actionButton")
			.removeEventListener("click", actionHandler);
		myModalEl.style.display = "none";
	};

	const showModal = function(htmlContent) {
		const myModalEl = document.getElementById("myModal");
		var dismissButtons = myModalEl.querySelectorAll(
			'[data-bs-dismiss="modal"]'
		);
		dismissButtons.forEach(function(button) {
			button.addEventListener("click", hideModal);
		});
		myModalEl
			.querySelector("#actionButton")
			.addEventListener("click", actionHandler);

		const myModalBodyEl = document.getElementById("myModalBody");
		myModalBodyEl.innerHTML = "";
		const div = document.createElement("div");
		div.innerHTML = htmlContent;
		myModalBodyEl.appendChild(div);

		myModalEl.style.display = "block";
	};

	tableUtility.clickHandler = function(event) {
		event.preventDefault();
		console.log(event.target.parentElement.firstChild.textContent);
		let cityId = Number(event.target.parentElement.dataset.id);
		if (!isNaN(cityId)) {
			showModal(
				"<h1 id='specialDataSet' data-id='" +
				cityId +
				"'>City ID: " +
				cityId +
				"</h1>"
			);
		}
	};

	const deleteHandler = function(row) {
		console.log("Captured click:" + JSON.stringify(row));
		deleteRow(row);
	}

	let newTable = tableUtility.createTable(data, "id", deleteHandler);
	document.getElementById("table").appendChild(newTable);
	document.getElementById("countOfRows").textContent = data.length;
};

const deleteRow = (row) => {
	let result = confirm("Are you sure you want to delete this city?");
	if (!result) {
		return;
	}
	deleteCity(row?.id || 0);
}

const deleteCity = (id) => {

	let xhr = new XMLHttpRequest();

	xhr.open("DELETE", `api/cities/${id}`, true);

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				let rowToRemove = document.getElementById("row-" + id)
				rowToRemove?.parentElement?.removeChild(rowToRemove);
			} else {
				console.error("DELETE request failed.");
				console.error(xhr.responseText);
				alert(errorResult?.errorMessage || "Unknown error");
			}
		}
	};

	xhr.send();

}

const fnError = (error) => {
	console.log(error);
	alert("There was an error. Please try again later.");
};

const getFromDatabase = () => {
	let url = urlPrefix + `api/cities`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			fnSuccess(data);
		})
		.catch((error) => {
			fnError(error);
		});
}

setTimeout(getFromDatabase, 0);
