const API_URL = "http://localhost:8080/movies_api/movies";
let movie = [];
let deleteId = null;

window.addEventListener("DOMContentLoaded", () => {
	getMovies();
});

const getMovies = async () => {
	let response = await fetch(`${API_URL}/`, {
		method: "GET",
	});
	let moviesData = await response.json();
	console.log(moviesData);
	renderResult(moviesData);
};

const customerList = document.querySelector("#customerList");

const renderResult = (movie) => {
	let listHTML = "";
	movie.forEach((movie) => {
		listHTML += `
		<div class="card">
		<div class="moviePoster"><img src="${movie.imageUrl}"  alt=""></div>
        <div>Titulo: ${movie.title}</div>
        <div>Año: ${movie.year}</div>
        <div>IMDB: ${movie.imdbRating}</div>
        <div class="options">
          <button type="button" onclick="editProduct(${movie.id})">Editar</button>
          <button type="button" onclick="openModalConfirm(${movie.id})">Eliminar</button>
		  <button type="button" onclick="openModalConfirm(${movie.id})">Ficha completa</button>
        </div>
      </div>
    `;
	});

	movieList.innerHTML = listHTML;
};

const addMovie = () => {
	const formData = new FormData(document.querySelector("#formAdd"));

	document.querySelector("#msgFormAdd").innerHTML = "";

	const movie = {
		title: formData.get("title"),
		year: formData.get("year"),
		imageUrl: formData.get("imgUrl"),
		certificate: formData.get("certificate"),
		runtime: formData.get("runtime"),
		imdbRating: formData.get("imdbRating"),
		metaScore: formData.get("metaScore"),
		votes: formData.get("votes"),
		gross: formData.get("gross"),
	};

	console.log(movie);

	fetch(
		`${API_URL}/add?title=${movie.title}
		&year=${movie.year}
		&imageUrl=${movie.imageUrl}
		&certificate=${movie.certificate}
		&runtime=${movie.runtime}
		&imdbRating=${movie.imdbRating}
		&metaScore=${movie.metaScore}
		&votes=${movie.votes}
		&gross=${movie.gross}`,
		{
			method: "POST",
			body: JSON.stringify(movie),
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
		.then((res) => res.json())
		.catch((error) => {
			alertManager("error", error);
			document.querySelector("#formAdd").reset();
		})
		.then((response) => {
			alertManager("success", response);
			getMovies();
		});
};

/*
const getCustomerByID = async (id) => {
	let response = await fetch(`${API_URL}/${id}`);
	let customerData = await response.json();
	return customerData;
};

const editCustomer = (customer) => {
	document.querySelector("#formEdit #id").value = customer.id;
	document.querySelector("#formEdit #name").value = customer.name;
	document.querySelector("#formEdit #surname").value = customer.surname;
	document.querySelector("#formEdit #birthdate").value = customer.birthdate;
	document.querySelector("#formEdit #phone").value = customer.phone;
	document.querySelector("#formEdit #country").value = customer.country;
	document.querySelector("#formEdit #city").value = customer.city;
	document.querySelector("#formEdit #direction").value = customer.direction;
	document.querySelector("#formEdit #postCode").value = customer.postCode;
};

const updateCustomer = () => {
	const customerToUpdate = {
		id: document.querySelector("#formEdit #id").value,
		name: document.querySelector("#formEdit #name").value,
		surname: document.querySelector("#formEdit #surname").value,
		birthdate: document.querySelector("#formEdit #birthdate").value,
		phone: document.querySelector("#formEdit #phone").value,
		country: document.querySelector("#formEdit #country").value,
		city: document.querySelector("#formEdit #city").value,
		direction: document.querySelector("#formEdit #direction").value,
		postCode: document.querySelector("#formEdit #postCode").value,
	};

	document.querySelector("#msgFormEdit").innerHTML = "";

	fetch(`${API_URL}/update?id=${customerToUpdate.id}
	&name=${customerToUpdate.name}
	&surname=${customerToUpdate.surname}
	&birthdate=${customerToUpdate.birthdate}
	&phone=${customerToUpdate.phone}
	&country=${customerToUpdate.country}
	&city=${customerToUpdate.city}
	&direction=${customerToUpdate.direction}
	&postCode=${customerToUpdate.postCode}
	`)
		.then((response) => response.text())
		.catch((error) => console.log("error", error))
		.then((result) => {
			console.log(result);
			closeModalEdit();
			getCustomer();
		});

	document.querySelector("#formEdit").reset();
};
*/
const deleteMovie = (deleteId) => {
	fetch(`${API_URL}/remove/${deleteId}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.catch((error) => {
			alertManager("error", error);
		})
		.then((response) => {
			alertManager("success", response);
			closeModalConfirm();
			getMovies();
			deleteId = null;
		});
};

const confirmDelete = (res) => {
	if (res) {
		deleteMovie(deleteId);
	} else {
		closeModalConfirm();
	}
};

// MODAL ADD MANAGER
/** --------------------------------------------------------------- */
const btnAdd = document.querySelector("#btnAdd");
const modalAdd = document.querySelector("#modalAdd");

btnAdd.onclick = () => openModalAdd();

window.onclick = function (event) {
	if (event.target == modalAdd) {
		//modalAdd.style.display = "none";
	}
};

const closeModalAdd = () => {
	modalAdd.style.display = "none";
};

const openModalAdd = () => {
	modalAdd.style.display = "block";
};

// MODAL ADIT MANAGER
/** --------------------------------------------------------------- */
const modalEdit = document.querySelector("#modalEdit");

const openModalEdit = async (id) => {
	modalEdit.style.display = "block";
	let customerData = await getCustomerByID(id);
	editCustomer(customerData);
};

const closeModalEdit = () => {
	modalEdit.style.display = "none";
};

window.onclick = function (event) {
	if (event.target == modalEdit) {
		//modalEdit.style.display = "none";
	}
};

// MODAL CONFIRM MANAGER
/** --------------------------------------------------------------- */
const modalConfirm = document.getElementById("modalConfirm");

window.onclick = function (event) {
	if (event.target == modalConfirm) {
		modalConfirm.style.display = "none";
	}
};

const closeModalConfirm = () => {
	modalConfirm.style.display = "none";
};

const openModalConfirm = (id) => {
	deleteId = id;
	modalConfirm.style.display = "block";
};

/** ALERT */
const alertManager = (typeMsg, message) => {
	const alert = document.querySelector("#alert");

	alert.innerHTML = message || "Se produjo cambios";
	alert.classList.add(typeMsg);
	alert.style.display = "block";

	setTimeout(() => {
		alert.style.display = "none";
		alert.classList.remove(typeMsg);
	}, 3500);
};
