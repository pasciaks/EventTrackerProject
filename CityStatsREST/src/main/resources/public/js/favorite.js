
const cityUtilityResults = new Promise((resolve, reject) => {
	let testObj = JSON.parse(localStorage.getItem(`_cityFavorites`));
	let stringList = "";
	if (testObj) {
		stringList = Object.keys(testObj).join(',');
	}
	let url = urlPrefix + `api/cities/favorites/${stringList}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			resolve(data);
		})
		.catch((error) => {
			reject(error);
		});
});

const fnRemoveUnwantedProperties = (data, arrayOfProperties) => {
	if (!data || data.length === 0) {
		data = [];
		return data;
	}
	tableUtility.hiddenColumns = arrayOfProperties;
	data = data.map((item) => {
		delete item.zips;
		delete item.ranking;
		return item;
	});
	return data;
};

const fnSortByCustomSorter = (data, sorter) => {
	if (!data || data.length === 0) {
		data = [];
		return data;
	}
	data = data.sort(sorter);
	return data;
};

const fnCustomSortByLargestPopulation = (a, b) => {
	return b.population - a.population;
};

const fnCustomSortByCityName = (a, b) => {
	return a.city.localeCompare(b.city);
};

const fnSuccess = (data) => {

	data = fnRemoveUnwantedProperties(data, ["zips", "ranking"]);

	if (!data || data.length === 0) {
		document.getElementById("table").innerHTML = "<h1>No data to display</h1>";
		return;
	}

	let sort = getParameterByName("sort");

	switch (sort) {
		case "city": // city
			data = fnSortByCustomSorter(data, fnCustomSortByCityName);
			break;
		case "population": // population
			data = fnSortByCustomSorter(data, fnCustomSortByLargestPopulation);
			break;
		default: // id
			data = fnSortByCustomSorter(data, function(a, b) {
				return a.id - b.id;
			});
			break;
	}

	const actionHandler = function() {
		let specialDataSet = document.getElementById("specialDataSet");
		let cityId = specialDataSet.getAttribute("data-id");
		localStorage.setItem("selectedCityId", cityId);
		hideModal();
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
		showModal(
			"<h1 id='specialDataSet' data-id='" +
			cityId +
			"'>City ID: " +
			cityId +
			"</h1>"
		);
	};

	let newTable = tableUtility.createTable(data, "id");
	document.getElementById("table").appendChild(newTable);
	document.getElementById("countOfRows").textContent = data.length;
};

const fnError = (error) => {
	console.log(error);
};

tableUtility.createTable(
	cityUtilityResults.then(fnSuccess).catch(fnError)
);
