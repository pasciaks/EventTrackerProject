const cityUtility = {
  loadCities: function () {
    let url = urlPrefix + `api/cities`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error("Error fetching cities:", error));
  },
};
