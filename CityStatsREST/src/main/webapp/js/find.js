const addEventListeners = () => {
  console.log("...adding event listeners...");
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

const fnError = (error) => {
  setTimeout(() => {
    showModal("<h1 id='specialDataSet' data-id='" + 0 + "'>" + error + "</h1>");
  }, 0);
};

const queryDatabaseForResults = () => {
  let id = getParameterByName("id") || 0;

  document.getElementById("id").value = id;

  let url = urlPrefix + `api/cities/${id}`;

  if (id == 0 || id === "" || id == null || isNaN(id)) {
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data === "") {
        fnError("No data found");
        return;
      }

      let cityId = data.id;

      if (!isNaN(cityId)) {
        setTimeout(() => {
          showModal(
            "<h1 id='specialDataSet' data-id='" +
              cityId +
              "'>Found City ID: " +
              cityId +
              " <br> " +
              data.city +
              "</h1><h2 class='text-dark' id='stateNameTrivia'></h2>"
          );

          setTimeout(() => {
            let stateClue = data.state;
            for (let i = 0; i < stateClue.length; i++) {
              if (Math.random() > 0.25) {
                stateClue = stateClue.replace(stateClue.charAt(i), "-");
              }
            }

            document.getElementById("stateNameTrivia").innerText = stateClue; //data.state.charAt(0).toUpperCase() + ".".repeat(data.state.length - 1);
          }, 4000);

          setTimeout(() => {
            document.getElementById("stateNameTrivia").innerText = data.state;
          }, 7000);
        }, 0);
      }
    })
    .catch((error) => {
      fnError("No data found");
    });
};

const generateRandomLinks = () => {
  let randomLinksContainer = document.getElementById("randomLinksContainer");
  randomLinksContainer.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    let randomLink = document.createElement("a");
    randomLink.classList.add("btn");
    let randomId = Math.floor(Math.random() * 32100);
    randomLink.href = `find.html?id=${randomId}`;
    randomLink.innerHTML = `Random City ${i + 1} (${randomId})`;
    randomLinksContainer.appendChild(randomLink);
  }
};

window.addEventListener("load", function () {
  addEventListeners();
  generateRandomLinks();
  queryDatabaseForResults();
});
