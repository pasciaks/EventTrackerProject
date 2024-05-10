const tableUtility = {
	hiddenColumns: [],
	clickHandler: function(event) {
		event.preventDefault();
		let cityId = Number(event.target.parentElement.getAttribute("data-id"));
		console.log("You clicked on a table row! The city ID is:" + cityId);
	},
	createTable: function(dataArray, primaryIdColumnName = "id", optionalHandlerElement) {
		let table = document.createElement("table");
		table.appendChild(this.createHead(dataArray));
		table.appendChild(this.createBody(dataArray, primaryIdColumnName, optionalHandlerElement));
		return table;
	},

	createRowWithThs: function(row) {
		let tr = document.createElement("tr");
		for (prop in row) {
			let th = document.createElement("th");
			th.textContent = prop;
			if (this.hiddenColumns.includes(prop)) {
				th.style.display = "none";
			}
			tr.appendChild(th);
		}
		return tr;
	},

	createRowWithTds: function(row, primaryIdColumnName, optionalHandlerElement) {
		let tr = document.createElement("tr");
		tr.setAttribute("id", "row-"+row[primaryIdColumnName]);
		let title = ""; // hidden columns will be added to the title attribute
		for (prop in row) {
			let td = document.createElement("td");
			td.textContent = row[prop];
			if (this.hiddenColumns.includes(prop)) {
				td.style.display = "none";
				title += `${prop}: ${row[prop]}\n`;
			}
			tr.setAttribute("data-id", row[primaryIdColumnName]);
			tr.setAttribute("title", title); // hidden columns will be added to the title attribute
			tr.appendChild(td);
		}
		if (optionalHandlerElement != null) {
			let td = document.createElement("td");
			let button = document.createElement("button");
			button.setAttribute("data-id", row[primaryIdColumnName]);
			button.setAttribute("data-action", "delete");
			button.classList.add("btn", "btn-danger");
			button.textContent = "Delete";
			button.addEventListener("click",optionalHandlerElement.bind(this,row));
			td.appendChild(button);
			tr.appendChild(td);
		}
		tr.addEventListener("click", this.clickHandler);
		return tr;
	},

	createHead: function(dataArray) {
		let thead = document.createElement("thead");
		thead.appendChild(this.createRowWithThs(dataArray[0]));
		return thead;
	},

	createBody: function(dataArray, primaryIdColumnName, optionalHandlerElement) {
		let tbody = document.createElement("tbody");
		for (let i = 0; i < dataArray.length; i++) {
			let newRow = this.createRowWithTds(dataArray[i], primaryIdColumnName, optionalHandlerElement);
			tbody.appendChild(newRow);
		}
		return tbody;
	},
};
