function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if (results == null) return "";
  else return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loadNavMenu() {
  fetch("nav.html")
    .then((response) => response.text())
    .then((html) => (document.getElementById("nav").innerHTML = html));
}

loadNavMenu();
