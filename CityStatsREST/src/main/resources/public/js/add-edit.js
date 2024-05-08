let onSubmitForm = function () {
  // Handle form submission logic here

  let id = document.getElementById("id").value;
  console.log(id);

  let city = document.getElementById("city").value;
  console.log(city);

  window.location.href = `success.html?id=${id}`;

  // Prevent default form submission
  return true; // or true if you want the form to submit normally
};
