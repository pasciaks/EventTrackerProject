
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

const addEventListeners = () => {


};

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

const showNoData = (selector) => {
	document.getElementById(selector).innerHTML = "<h1>No data to display</h1>";
}

const fnSuccess = (data) => {

	data = fnRemoveUnwantedProperties(data, ["zips", "ranking"]);

	if (!data || data.length === 0) {
		showNoData("table");
		return;
	}

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
	document.getElementById("table").innerHTML = "";
	document.getElementById("table").appendChild(newTable);
	document.getElementById("countOfRows").textContent = data.length + " items found";
};

const fnError = (error) => {
	console.log(error);
	if (!data || data.length === 0) {
		showNoData("table");
		return;
	}
};

const queryDatabaseForResults = () => {
	
	let pageSize = prompt("What page size ?","2");
	let pageNumber = prompt("What page number ?","1");

	let url = urlPrefix + `api/citypages?pageSize=${pageSize}&pageNumber=${pageNumber}`;
	
	document.getElementById("pageSize").textContent = pageSize;
	document.getElementById("pageNumber").textContent = pageNumber;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			
			document.getElementById("preContainer").textContent = JSON.stringify(data, null, 2);
			
			data = data.content;
			fnSuccess(data);
		})
		.catch((error) => {
			fnError(error);
		});

};

addEventListeners();

setTimeout(() => {
	queryDatabaseForResults();
}, 0);
