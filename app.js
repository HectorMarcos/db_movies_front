const API_URL = "http://localhost:8080/movies_api/movies";
let movie = [];
let deleteId = null;

window.addEventListener("DOMContentLoaded", () => {
	getMovies();
	openModalInfo(1);
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
	//FIXME IMG BACKGROUND
	let listHTML = "";
	movie.forEach((movie) => {
		let img = movie.imageUrl;
		console.log(movie.imageUrl);
		listHTML += `
		<div class="card">
		<div class="moviePoster"><img src="${movie.imageUrl}"></div>
		<div class="card-info">
        <div>Titulo: ${movie.title}</div>
        <div>Año: ${movie.year}</div>
        <div>IMDB: ${movie.imdbRating}</div>
		</div>
        <div class="options">
		  <button type="button" class="btn btn-primary btn-sm" onclick="openModalInfo(${movie.id})">Ficha completa</button>
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
		info: formData.get("info"),
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
		&description=${movie.info}
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

const getMovieByID = async (id) => {
	let response = await fetch(`${API_URL}/${id}`);
	let movieData = await response.json();
	return movieData;
};

/* MOVIE INFO */

const movieInfo = (movie) => {
	document.querySelector("#formInfo #id").value = movie.id;
	document.querySelector("#formInfo #title").value = movie.title;
	document.querySelector("#formInfo #year").value = movie.year;
	document.querySelector("#formInfo #imgUrl").value = movie.imageUrl;
	document.querySelector("#formInfo #certificate").value = movie.certificate;
	document.querySelector("#formInfo #runtime").value = movie.runtime;
	document.querySelector("#formInfo #imdbRating").value = movie.imdbRating;
	document.querySelector("#formInfo #info").value = movie.info;
	document.querySelector("#formInfo #metaScore").value = movie.metaScore;
	document.querySelector("#formInfo #votes").value = movie.votes;
	document.querySelector("#formInfo #gross").value = movie.gross;
};

/* MOVIE UPDATE */
const editMovie = () => {
	document.querySelector("#formInfo #id").disabled = true;
	document.querySelector("#formInfo #title").disabled = false;
	document.querySelector("#formInfo #year").disabled = false;
	document.querySelector("#formInfo #imgUrl").disabled = false;
	document.querySelector("#formInfo #certificate").disabled = false;
	document.querySelector("#formInfo #runtime").disabled = false;
	document.querySelector("#formInfo #imdbRating").disabled = false;
	document.querySelector("#formInfo #info").disabled = false;
	document.querySelector("#formInfo #metaScore").disabled = false;
	document.querySelector("#formInfo #votes").disabled = false;
	document.querySelector("#formInfo #gross").disabled = false;

	SaveChanges.style.display = "inline-block";
};

const updateMovie = () => {
	const movieToUpdate = {
		id: document.querySelector("#formInfo #id").value,
		title: document.querySelector("#formInfo #title").value,
		year: document.querySelector("#formInfo #year").value,
		imgUrl: document.querySelector("#formInfo #imgUrl").value,
		certificate: document.querySelector("#formInfo #certificate").value,
		runtime: document.querySelector("#formInfo #runtime").value,
		imdbRating: document.querySelector("#formInfo #imdbRating").value,
		info: document.querySelector("#formInfo #info").value,
		metaScore: document.querySelector("#formInfo #metaScore").value,
		votes: document.querySelector("#formInfo #votes").value,
		gross: document.querySelector("#formInfo #gross").value,
	};

	console.log(movieToUpdate);

	/* document.querySelector("#msgFormInfo").innerHTML = ""; */

	fetch(`${API_URL}/update?id=${movieToUpdate.id}
	&title=${movieToUpdate.title}
	&year=${movieToUpdate.year}
	&imageUrl=${movieToUpdate.imgUrl}
	&certificate=${movieToUpdate.certificate}
	&runtime=${movieToUpdate.runtime}
	&imdbRating=${movieToUpdate.imdbRating}
	&info=${movieToUpdate.info}
	&metaScore=${movieToUpdate.metaScore}
	&votes=${movieToUpdate.votes}
	&gross=${movieToUpdate.gross}
	`)
		.then((response) => response.text())
		.catch((error) => console.log("error", error))
		.then((result) => {
			console.log(result);
			closeModalInfo();
			getMovies();
		});

	document.querySelector("#formInfo").reset();
};

/* DELETE */
const deleteMovie = () => {
	let deleteId = document.querySelector("#formInfo #id").value;
	console.log(deleteId);
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
		deleteMovie();
		closeModalEdit();
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

// MODAL INFO MANAGER
/** --------------------------------------------------------------- */
const modalInfo = document.querySelector("#modalInfo");

const openModalInfo = async (id) => {
	modalInfo.style.display = "block";
	let movieData = await getMovieByID(id);
	movieInfo(movieData);
};

const closeModalInfo = () => {
	modalInfo.style.display = "none";
	SaveChanges.style.display = "none";
	document.querySelector("#formInfo #title").disabled = true;
	document.querySelector("#formInfo #year").disabled = true;
	document.querySelector("#formInfo #imgUrl").disabled = true;
	document.querySelector("#formInfo #certificate").disabled = true;
	document.querySelector("#formInfo #runtime").disabled = true;
	document.querySelector("#formInfo #imdbRating").disabled = true;
	document.querySelector("#formInfo #metaScore").disabled = true;
	document.querySelector("#formInfo #votes").disabled = true;
	document.querySelector("#formInfo #gross").disabled = true;
	document.querySelector("#formInfo #info").disabled = true;
};

window.onclick = function (event) {
	if (event.target == modalInfo) {
		//modalEdit.style.display = "none";
	}
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

// MODAL REMOVE MANAGER
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
