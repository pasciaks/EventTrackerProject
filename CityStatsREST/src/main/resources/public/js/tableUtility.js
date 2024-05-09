const tableUtility = {
  hiddenColumns: [],
  clickHandler: function (event) {
    event.preventDefault();
    let cityId = Number(event.target.parentElement.getAttribute("data-id"));
    console.log("You clicked on a table row! The city ID is:" + cityId);
  },
  createTable: function (dataArray, primaryIdColumnName = "id") {
    let table = document.createElement("table");
    table.appendChild(this.createHead(dataArray));
    table.appendChild(this.createBody(dataArray, primaryIdColumnName));
    return table;
  },

  createRowWithThs: function (row) {
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

  createRowWithTds: function (row, primaryIdColumnName) {
    let tr = document.createElement("tr");
    tr.addEventListener("click", this.clickHandler);
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
    return tr;
  },

  createHead: function (dataArray) {
    let thead = document.createElement("thead");
    thead.appendChild(this.createRowWithThs(dataArray[0]));
    return thead;
  },

  createBody: function (dataArray, primaryIdColumnName) {
    let tbody = document.createElement("tbody");
    for (let i = 0; i < dataArray.length; i++) {
      let newRow = this.createRowWithTds(dataArray[i], primaryIdColumnName);
      tbody.appendChild(newRow);
    }
    return tbody;
  },
};
