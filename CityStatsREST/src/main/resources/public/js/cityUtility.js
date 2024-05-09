const cityUtility = {
  loadCities: function (callback) {
    let url = urlPrefix + `api/cities`;
    console.log("cityUtility loadCities...");
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        callback(data);
        return data;
      })
      .catch((error) => console.error("Error fetching cities:", error));
  },
  loadCity: function (id, callback) {
    let url = urlPrefix + `api/cities/${id}`;
    console.log("cityUtility loadCity...");
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        callback(data);
        return data;
      })
      .catch((error) => console.error("Error fetching city:", error));
  },
};
