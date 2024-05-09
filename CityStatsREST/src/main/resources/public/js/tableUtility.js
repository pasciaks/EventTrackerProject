const tableUtility = {
  clickHandler: function (event) {
    event.preventDefault();
    console.log("You clicked on a table row!");
    console.log(event.target.parentElement.firstChild.textContent);
    let cityId = Number(event.target.parentElement.firstChild.textContent);
    alert("You clicked on a table row! The city ID is: " + cityId);
  },
  createTable: function (dataArray) {
    let table = document.createElement("table");
    table.appendChild(this.createHead(dataArray));
    table.appendChild(this.createBody(dataArray));
    return table;
  },

  createRowWithThs: function (row) {
    let tr = document.createElement("tr");
    for (prop in row) {
      let th = document.createElement("th");
      th.textContent = prop;
      tr.appendChild(th);
    }
    return tr;
  },

  createRowWithTds: function (row) {
    let tr = document.createElement("tr");
    tr.addEventListener("click", this.clickHandler);
    for (prop in row) {
      let td = document.createElement("td");
      td.textContent = row[prop];
      tr.appendChild(td);
    }
    return tr;
  },

  createHead: function (dataArray) {
    let thead = document.createElement("thead");
    thead.appendChild(this.createRowWithThs(dataArray[0]));
    return thead;
  },

  createBody: function (dataArray) {
    let tbody = document.createElement("tbody");
    for (let i = 0; i < dataArray.length; i++) {
      let newRow = this.createRowWithTds(dataArray[i]);
      tbody.appendChild(newRow);
    }
    return tbody;
  },
};
