(() => {
  let urlPrefix = "";

  if (
    window.location.href.indexOf("127.0.0.1") > -1 ||
    window.location.href.indexOf("localhost") > -1
  ) {
    urlPrefix = "http://localhost:8083/";
  } else {
    urlPrefix = "";
  }

  let minlat = 99999;
  let maxlat = -99999;
  let minlng = 99999;
  let maxlng = -99999;

  let statesObj = {
    AL: {
      name: "Alabama",
      capital: "Montgomery",
      lat: "32.361538",
      long: "-86.279118",
    },
    AK: {
      name: "Alaska",
      capital: "Juneau",
      lat: "58.301935",
      long: "-134.419740",
    },
    AZ: {
      name: "Arizona",
      capital: "Phoenix",
      lat: "33.448457",
      long: "-112.073844",
    },
    AR: {
      name: "Arkansas",
      capital: "Little Rock",
      lat: "34.736009",
      long: "-92.331122",
    },
    CA: {
      name: "California",
      capital: "Sacramento",
      lat: "38.555605",
      long: "-121.468926",
    },
    CO: {
      name: "Colorado",
      capital: "Denver",
      lat: "39.7391667",
      long: "-104.984167",
    },
    CT: {
      name: "Connecticut",
      capital: "Hartford",
      lat: "41.767",
      long: "-72.677",
    },
    DE: {
      name: "Delaware",
      capital: "Dover",
      lat: "39.161921",
      long: "-75.526755",
    },
    FL: {
      name: "Florida",
      capital: "Tallahassee",
      lat: "30.4518",
      long: "-84.27277",
    },
    GA: {
      name: "Georgia",
      capital: "Atlanta",
      lat: "33.76",
      long: "-84.39",
    },
    HI: {
      name: "Hawaii",
      capital: "Honolulu",
      lat: "21.30895",
      long: "-157.826182",
    },
    ID: {
      name: "Idaho",
      capital: "Boise",
      lat: "43.613739",
      long: "-116.237651",
    },
    IL: {
      name: "Illinois",
      capital: "Springfield",
      lat: "39.783250",
      long: "-89.650373",
    },
    IN: {
      name: "Indiana",
      capital: "Indianapolis",
      lat: "39.790942",
      long: "-86.147685",
    },
    IA: {
      name: "Iowa",
      capital: "Des Moines",
      lat: "41.590939",
      long: "-93.620866",
    },
    KS: {
      name: "Kansas",
      capital: "Topeka",
      lat: "39.04",
      long: "-95.69",
    },
    KY: {
      name: "Kentucky",
      capital: "Frankfort",
      lat: "38.197274",
      long: "-84.86311",
    },
    LA: {
      name: "Louisiana",
      capital: "Baton Rouge",
      lat: "30.45809",
      long: "-91.140229",
    },
    ME: {
      name: "Maine",
      capital: "Augusta",
      lat: "44.323535",
      long: "-69.765261",
    },
    MD: {
      name: "Maryland",
      capital: "Annapolis",
      lat: "38.972945",
      long: "-76.501157",
    },
    MA: {
      name: "Massachusetts",
      capital: "Boston",
      lat: "42.2352",
      long: "-71.0275",
    },
    MI: {
      name: "Michigan",
      capital: "Lansing",
      lat: "42.7335",
      long: "-84.5467",
    },
    MN: {
      name: "Minnesota",
      capital: "Saint Paul",
      lat: "44.95",
      long: "-93.094",
    },
    MS: {
      name: "Mississippi",
      capital: "Jackson",
      lat: "32.320",
      long: "-90.207",
    },
    MO: {
      name: "Missouri",
      capital: "Jefferson City",
      lat: "38.572954",
      long: "-92.189283",
    },
    MT: {
      name: "Montana",
      capital: "Helana",
      lat: "46.595805",
      long: "-112.027031",
    },
    NE: {
      name: "Nebraska",
      capital: "Lincoln",
      lat: "40.809868",
      long: "-96.675345",
    },
    NV: {
      name: "Nevada",
      capital: "Carson City",
      lat: "39.160949",
      long: "-119.753877",
    },
    NH: {
      name: "New Hampshire",
      capital: "Concord",
      lat: "43.220093",
      long: "-71.549127",
    },
    NJ: {
      name: "New Jersey",
      capital: "Trenton",
      lat: "40.221741",
      long: "-74.756138",
    },
    NM: {
      name: "New Mexico",
      capital: "Santa Fe",
      lat: "35.667231",
      long: "-105.964575",
    },
    NY: {
      name: "New York",
      capital: "Albany",
      lat: "42.659829",
      long: "-73.781339",
    },
    NC: {
      name: "North Carolina",
      capital: "Raleigh",
      lat: "35.771",
      long: "-78.638",
    },
    ND: {
      name: "North Dakota",
      capital: "Bismarck",
      lat: "48.813343",
      long: "-100.779004",
    },
    OH: {
      name: "Ohio",
      capital: "Columbus",
      lat: "39.962245",
      long: "-83.000647",
    },
    OK: {
      name: "Oklahoma",
      capital: "Oklahoma City",
      lat: "35.482309",
      long: "-97.534994",
    },
    OR: {
      name: "Oregon",
      capital: "Salem",
      lat: "44.931109",
      long: "-123.029159",
    },
    PA: {
      name: "Pennsylvania",
      capital: "Harrisburg",
      lat: "40.269789",
      long: "-76.875613",
    },
    RI: {
      name: "Rhode Island",
      capital: "Providence",
      lat: "41.82355",
      long: "-71.422132",
    },
    SC: {
      name: "South Carolina",
      capital: "Columbia",
      lat: "34.000",
      long: "-81.035",
    },
    SD: {
      name: "South Dakota",
      capital: "Pierre",
      lat: "44.367966",
      long: "-100.336378",
    },
    TN: {
      name: "Tennessee",
      capital: "Nashville",
      lat: "36.165",
      long: "-86.784",
    },
    TX: {
      name: "Texas",
      capital: "Austin",
      lat: "30.266667",
      long: "-97.75",
    },
    UT: {
      name: "Utah",
      capital: "Salt Lake City",
      lat: "40.7547",
      long: "-111.892622",
    },
    VT: {
      name: "Vermont",
      capital: "Montpelier",
      lat: "44.26639",
      long: "-72.57194",
    },
    VA: {
      name: "Virginia",
      capital: "Richmond",
      lat: "37.54",
      long: "-77.46",
    },
    WA: {
      name: "Washington",
      capital: "Olympia",
      lat: "47.042418",
      long: "-122.893077",
    },
    WV: {
      name: "West Virginia",
      capital: "Charleston",
      lat: "38.349497",
      long: "-81.633294",
    },
    WI: {
      name: "Wisconsin",
      capital: "Madison",
      lat: "43.074722",
      long: "-89.384444",
    },
    WY: {
      name: "Wyoming",
      capital: "Cheyenne",
      lat: "41.145548",
      long: "-104.802042",
    },
  };

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    else return decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  let myCanvas = document.getElementById("myCanvas");

  myCanvas.addEventListener("mousemove", function (event) {
    console.log(event.offsetX, event.offsetY);

    // todo: translate these x,y to lat,lng

    let guessLat = 90 - event.offsetY / (myCanvas.height / 180);
    let guessLng = event.offsetX / (myCanvas.width / 360) - 180;

    console.log("Guess Lat: " + guessLat);
    console.log("Guess Lng: " + guessLng);
  });

  let ctx = myCanvas.getContext("2d");

  ctx.fillStyle = "#cfe2ff";

  ctx.fillRect(1, 1, myCanvas.width - 1, myCanvas.height - 1);

  let statesList = [];

  let drawPoints = function (lat, lng, clrString = "red", size = 1) {
    if (lat < minlat) {
      minlat = lat;
    }
    if (lat > maxlat) {
      maxlat = lat;
    }
    if (lng < minlng) {
      minlng = lng;
    }
    if (lng > maxlng) {
      maxlng = lng;
    }

    document.getElementById("minlat").textContent = minlat;
    document.getElementById("maxlat").textContent = maxlat;
    document.getElementById("minlng").textContent = minlng;
    document.getElementById("maxlng").textContent = maxlng;

    // NOTE: HARD CODED FACTORS, LOSES SMALL PARTS OF ALASKA AND HAWAII DUE TO LAT/LNG RATIO ON PURPOSE
    let xRatio = 3 * (myCanvas.width / 360); // NOTE: HARD CODED 3 (USA Country only in world map lat/lng)
    let yRatio = 2 * (myCanvas.height / 180); // NOTE: HARD CODED 2 (USA Country only in world map lat/lng)

    let x = (lng + 180) * xRatio;
    let y = (90 - lat) * yRatio;

    if (clrString === "gold") {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = clrString;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillStyle = clrString;
      ctx.fillRect(x - size, y - size, 2 * size, 2 * size);
    }
  };

  let loadCities = function (stateName) {
    let url = urlPrefix + `api/cities`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((city) => {
          drawPoints(city.lat, city.lng, "black");
        });
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  let loadCitiesWithCoordinates = function (
    city = getParameterByName("city") || ""
  ) {
    let url = urlPrefix + `api/cities/coordinates?city=${city}`;
    //let url = urlPrefix + `api/cities/coordinates`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((city) => {
          drawPoints(city.lat, city.lng, "black");
        });
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const drawCapitals = () => {
    for (state in statesObj) {
      let temp = statesObj[state];

      let latv = Number(temp["lat"]);
      let longv = Number(temp["long"]);

      console.log(latv, longv);

      drawPoints(latv, longv, "gold", 2);
    }
  };

  let showBoundsPoints = function () {
    drawPoints(minlat, minlng, "blue", 1);
    drawPoints(minlat, maxlng, "blue", 1);
    drawPoints(maxlat, minlng, "blue", 1);
    drawPoints(maxlat, maxlng, "blue", 1);
  };

  let loadCitiesForState = function (stateName) {
    let url = urlPrefix + `api/cities/states/${stateName}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("cityList").textContent = "";

        const cityList = document.getElementById("cityList");
        cityList.textContent = "";
        data.forEach((city) => {
          const ahref = document.createElement("a");
          //ahref.href = `api/cities/${city.id}`;
          ahref.href = `add-edit.html?cityId=${city.id}`;

          ahref.textContent = "[" + city.city + "]";
          cityList.appendChild(ahref);
          drawPoints(city.lat, city.lng, "red");
        });
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  let loadStates = function () {
    let url = urlPrefix + `api/cities/states`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((state) => {
          const stateDiv = document.getElementById("stateDiv");
          const card = document.createElement("div");
          card.classList.add("card", "col-2", "state");
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          cardBody.textContent = state;

          cardBody.addEventListener("click", () => {
            loadCitiesForState(state);

            setTimeout(() => {
              drawCapitals();
            }, 1500);
          });

          card.appendChild(cardBody);
          stateDiv.appendChild(card);

          statesList.push(state);
        });
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  document.addEventListener("DOMContentLoaded", function () {
    loadStates();

    let citiesLoader = new Promise((resolve, reject) => {
      // loadCities();

      loadCitiesWithCoordinates();

      setTimeout(() => {
        drawCapitals();

        resolve("Success");
      }, 1000);

      setTimeout(() => {
        showBoundsPoints();
      }, 2000);
    });

    citiesLoader.then((message) => {
      if (message === "Success") {
        //let randomState = Math.floor(Math.random() * statesList.length);
        //console.log("Random State: " + statesList[randomState]);
        //loadCitiesForState(statesList[randomState]);
      }
    });
  });
})();
