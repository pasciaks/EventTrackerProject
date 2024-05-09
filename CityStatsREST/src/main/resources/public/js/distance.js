const cityUtilityResults = new Promise((resolve, reject) => {
  let url = urlPrefix + `api/cities`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});

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
  // data = data.map((item) => {
  //   delete item.zips;
  //   delete item.ranking;
  //   return item;
  // });
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
      data = fnSortByCustomSorter(data, function (a, b) {
        return a.id - b.id;
      });
      break;
  }

  tableUtility.clickHandler = function (event) {
    event.preventDefault();
    console.log("!!You clicked on a table row!");
    console.log(event.target.parentElement.firstChild.textContent);
    let cityId = Number(event.target.parentElement.dataset.id);
    window.location.href = `detail.html?id=${cityId}`;
  };

  let newTable = tableUtility.createTable(data, "id");
  document.getElementById("table").appendChild(newTable);
  document.getElementById("countOfRows").textContent = data.length;
};

const fnError = (error) => {
  console.log(error);
  alert("There was an error. Please try again later.");
};

let table = tableUtility.createTable(
  cityUtilityResults.then(fnSuccess).catch(fnError)
);
