const addEventListeners = () => {
  console.log("...adding event listeners...");
  document
    .getElementById("demonstrateSuccess")
    .addEventListener("click", function () {
      console.log("...clicked...");
      cityUtility.loadCity(1, showSuccess, showError);
    });
  document
    .getElementById("demonstrateFailure")
    .addEventListener("click", function () {
      console.log("...clicked...");
      cityUtility.loadCity(64000, showSuccess, showError);
    });
};

const actionHandler = function () {
  console.log("Action button clicked");
  hideModal();
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

const showSuccess = (info) => {
  console.log(info);
  showModal(`<h1 class="text-success">${"Success!"}</h1>`);
};

const showError = (error) => {
  console.log(error);
  showModal(`<h1 class="text-danger">${"Error!"}</h1>`);
};

const queryDatabaseForResults = () => {
  // cityUtility.loadCity(1, showSuccess, showError);
};

window.addEventListener("load", function () {
  addEventListeners();
  queryDatabaseForResults();
});
