
	
	window.addEventListener("load", function() {

	let xhr = new XMLHttpRequest();

	xhr.open("GET", "api/cities/" + 1, true);

	xhr.onreadystatechange = function() {
		console.log(xhr.readyState);
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				return data;
			} else {
				console.error(xhr.status + ": " + xhr.responseText);
			}
		}
	};

	xhr.send();
	
    });