const cityUtility = {
  loadCities: function (success, failure) {
    let url = urlPrefix + `api/cities`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
          }
        } else {
          return response.json();
        }
      })
      .then((data) => {
        return success(data);
      })
      .catch((error) => {
        console.log("Caught Error:", error.message);
        failure(error);
      });
  },
  loadCity: function (id, success, failure) {
    let url = urlPrefix + `api/cities/${id}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
          }
        } else {
          return response.json();
        }
      })
      .then((data) => {
        return success(data);
      })
      .catch((error) => {
        console.log("Caught Error:", error.message);
        failure(error);
      });
  },
};
