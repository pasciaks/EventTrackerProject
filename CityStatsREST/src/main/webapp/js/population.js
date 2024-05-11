
const addEventListeners = () => {
	console.log("...adding event listeners...");
};

const showNoData = (selector) => {
	document.getElementById(selector).innerHTML = "<h1>No data to display</h1>";
}

const fnError = (error) => {
	console.log(error);
};

const queryDatabaseForResults = () => {


	document.getElementById("table").innerText = "Loading...";

	setTimeout(() => {

		document.getElementById("table").innerText = "Loading...Average Population Sizes...";
		queryDBForAveragePops();
	}, 1000);

	setTimeout(() => {
		document.getElementById("table").innerText = "Loading...Sum of Population Sizes...";
		queryDBForSumPops();
	}, 2000);

	setTimeout(() => {
		document.getElementById("table").innerText = "Loading...Count of Cities...";
		queryDBForCountOf();
	}, 3000);

	//queryDBForAveragePops();
	//queryDBForSumPops();
	//queryDBForCountOf();

	setTimeout(() => {
		document.getElementById("table").innerText = "Compiling/combining data for table view...";
	}, 4000);

	let arrayOfStates = [];

	setTimeout(() => {

		console.log(statesObject);

		//console.log(countof);

		countof.forEach((item) => {
			let state = item[0];
			let count = item[1];
			let sum = sumpop.find((item) => item[0] === state)[1];
			let avg = avgpop.find((item) => item[0] === state)[1];
			let obj = {
				state: state,
				count: count,
				sum: sum,
				avg: Math.round(avg, 2)
			};
			arrayOfStates.push(obj);
		});

		//console.log(sumpop);
		//console.log(avgpop);

		console.log(arrayOfStates);

		tableUtility.clickHandler = function(event) {
			event.preventDefault();
			console.log(event.target);
		};

		let divider = document.createElement("div");
		divider.style.height = "20px";
		divider.style.marginTop = "20px";
		divider.style.marginBottom = "20px";
		divider.style.backgroundColor = "black";
		divider.style.color = "white";
		divider.innerText = "Sorted by State Name";
		document.getElementById("table").appendChild(divider);

		let newTable = tableUtility.createTable(arrayOfStates, "state");
		document.getElementById("table").appendChild(newTable);

		arrayOfStates = arrayOfStates.sort((a, b) => {
			return Number(b.count) - Number(a.count);
		});

		divider = document.createElement("div");
		divider.style.height = "20px";
		divider.style.marginTop = "20px";
		divider.style.marginBottom = "20px";
		divider.style.backgroundColor = "black";
		divider.style.color = "white";
		divider.innerText = "Sorted by Count of Cities";
		document.getElementById("table").appendChild(divider);

		let newTableCount = tableUtility.createTable(arrayOfStates, "state");
		document.getElementById("table").appendChild(newTableCount);

		arrayOfStates = arrayOfStates.sort((a, b) => {
			return Number(b.sum) - Number(a.sum);
		});

		divider = document.createElement("div");
		divider.style.height = "20px";
		divider.style.marginTop = "20px";
		divider.style.marginBottom = "20px";
		divider.style.backgroundColor = "black";
		divider.style.color = "white";
		divider.innerText = "Sorted by Sum of Population";
		document.getElementById("table").appendChild(divider);

		let newTableSum = tableUtility.createTable(arrayOfStates, "state");
		document.getElementById("table").appendChild(newTableSum);

		arrayOfStates = arrayOfStates.sort((a, b) => {
			return Number(b.avg) - Number(a.avg);
		});

		divider = document.createElement("div");
		divider.style.height = "20px";
		divider.style.marginTop = "20px";
		divider.style.marginBottom = "20px";
		divider.style.backgroundColor = "black";
		divider.style.color = "white";
		divider.innerText = "Sorted by Average City Population";
		document.getElementById("table").appendChild(divider);

		let newTableAvg = tableUtility.createTable(arrayOfStates, "state");
		document.getElementById("table").appendChild(newTableAvg);



	}, 6000);
};

const queryDBForAveragePops = () => {

	document.getElementById("avgpop").style.color = "yellow";
	let url = urlPrefix + `api/cities/avgpop`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data === "") {
				fnError("No data found");
				return;
			}
			console.log(data);
			avgpop = data;
			document.getElementById("avgpop").style.color = "green";
			//document.getElementById("avgpop").innerText = JSON.stringify(data, null, 2);
		})
		.catch((error) => {
			document.getElementById("avgpop").style.color = "red";
			console.log(error);
			fnError("No data found");
		});
}
const queryDBForSumPops = () => {

	document.getElementById("sumpop").style.color = "yellow";
	let url = urlPrefix + `api/cities/sumpop`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data === "") {
				fnError("No data found");
				return;
			}
			console.log(data);
			sumpop = data;
			document.getElementById("sumpop").style.color = "green";
			//document.getElementById("sumpop").innerText = JSON.stringify(data, null, 2);
		})
		.catch((error) => {
			document.getElementById("sumpop").style.color = "red";
			console.log(error);
			fnError("No data found");
		});
}

const queryDBForCountOf = () => {

	document.getElementById("countof").style.color = "yellow";
	let url = urlPrefix + `api/cities/countof`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data === "") {
				fnError("No data found");
				return;
			}
			console.log(data);
			countof = data;

			document.getElementById("countof").style.color = "green";

			//document.getElementById("countof").innerText = JSON.stringify(data, null, 2);
		})
		.catch((error) => {
			document.getElementById("countof").style.color = "red";
			console.log(error);
			fnError("No data found");
		});
}

let statesObject = {};
let countof = [];
let sumpop = [];
let avgpop = [];

addEventListeners();

setTimeout(() => {
	document.getElementById("table").innerText = "Started...";
	queryDatabaseForResults();
}, 0);
