let onSubmitForm = function () {
  // Handle form submission logic here

  console.log(form.id.value);
  console.log(form.city.value);
  console.log(form.state.value);
  console.log(form.county.value);
  console.log(form.lat.value);
  console.log(form.lng.value);
  console.log(form.population.value);
  console.log(form.density.value);
  console.log(form.timezone.value);
  console.log(form.ranking.value);
  console.log(form.zips.value);

  // let id = document.getElementById("id").value;
  // console.log(id);

  // let city = document.getElementById("city").value;
  // console.log(city);

  window.location.href = `success.html?id=${id}`;

  // Prevent default form submission
  return true; // or true if you want the form to submit normally
};
