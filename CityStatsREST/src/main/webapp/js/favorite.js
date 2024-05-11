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

const removeFromFavorites = () => {
  let specialDataSet = document.getElementById("specialDataSet");
  let cityId = specialDataSet.getAttribute("data-id");
  let testObj = JSON.parse(localStorage.getItem(`_cityFavorites`));
  if (testObj) {
    delete testObj[cityId];
    localStorage.setItem(`_cityFavorites`, JSON.stringify(testObj));
    // window.location.reload();
  } else {
    localStorage.setItem(`_cityFavorites`, JSON.stringify({}));
    // window.location.reload();
  }
};

const addEventListeners = () => {
  document
    .getElementById("unfavoritebutton")
    .addEventListener("click", function (event) {
      event.preventDefault();
      removeFromFavorites();
      window.location.reload();
      //   setTimeout(() => {
      //     queryDatabaseForResults();
      //     showLocalStorageSavedFavorites();
      //   }, 0);
      hideModal();
    });
};

const actionHandler = function () {
  let specialDataSet = document.getElementById("specialDataSet");
  let cityId = specialDataSet.getAttribute("data-id");
  localStorage.setItem("selectedCityId", cityId);
  hideModal();
  window.location.href = `detail.html`;
};

const hideModal = function () {
  const myModalEl = document.getElementById("myModal");
  var dismissButtons = myModalEl.querySelectorAll('[data-bs-dismiss="modal"]');
  dismissButtons.forEach(function (button) {
    button.removeEventListener("click", hideModal);
  });
  myModalEl
    .querySelector("#actionButton")
    .removeEventListener("click", actionHandler);
  myModalEl.style.display = "none";
};

const showModal = function (htmlContent) {
  const myModalEl = document.getElementById("myModal");
  var dismissButtons = myModalEl.querySelectorAll('[data-bs-dismiss="modal"]');
  dismissButtons.forEach(function (button) {
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
};

const fnSuccess = (data) => {
  if (!data || data.length === 0) {
    showNoData("table");
    return;
  }

  data = fnRemoveUnwantedProperties(data, ["zips", "ranking"]);

  tableUtility.clickHandler = function (event) {
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
  document.getElementById("countOfRows").textContent =
    data.length + " items found";
};

const fnError = (error) => {
  console.log(error);
  showNoData("table");
};

const queryDatabaseForResults = () => {
  let locallyStoredFavorites = JSON.parse(
    localStorage.getItem(`_cityFavorites`)
  );

  let stringList = "";

  if (locallyStoredFavorites) {
    stringList = Object.keys(locallyStoredFavorites).join(",");
  }

  let url = urlPrefix + `api/cities/favorites/${stringList}`;

  document.getElementById("idList").textContent = stringList;

  document.getElementById("table").innerHTML = "";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      fnSuccess(data);
    })
    .catch((error) => {
      fnError(error);
    });
};

const populateFavoritesTable = (data) => {
  if (!data || data.length === 0) {
    showNoData("favoritesTable");
    return;
  }

  data = fnRemoveUnwantedProperties(data, ["zips", "ranking"]);

  tableUtility.clickHandler = function (event) {
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
  document.getElementById("favoritesTable").innerHTML = "";
  document.getElementById("favoritesTable").appendChild(newTable);
  document.getElementById("countOfRowsFavorites").textContent =
    data.length + " items found";
};

const showLocalStorageSavedFavorites = () => {
  let storedFavorites = JSON.parse(localStorage.getItem(`_cityFavorites`));
  let favoritesArray = [];

  if (storedFavorites) {
    Object.keys(storedFavorites).map((key) => {
      delete storedFavorites[key].lat;
      delete storedFavorites[key].lng;
      delete storedFavorites[key].density;
      delete storedFavorites[key].county;
      delete storedFavorites[key].population;
      delete storedFavorites[key].timezone;
      favoritesArray.push(storedFavorites[key]);
    });

    favoritesArray.sort((a, b) => {
      let aDate = new Date(a.favoritedOn);
      let bDate = new Date(b.favoritedOn);
      if (aDate < bDate) {
        return 1;
      }
      if (aDate > bDate) {
        return -1;
      }
      return 0;
    });
    populateFavoritesTable(favoritesArray);
  } else {
    showNoData("favoritesTable");
  }
};

addEventListeners();
queryDatabaseForResults();
showLocalStorageSavedFavorites();
