const API_URL = "http://localhost:8080/movies_api/movies/";
let movie = [];
let deleteId = null;

window.addEventListener("DOMContentLoaded", () => {
	getMovies();
});

const getMovies = async () => {
	let response = await fetch(API_URL);
	let moviesData = await response.json();
	console.log(moviesData);
	renderResult(moviesData);
};

const customerList = document.querySelector("#customerList");

const renderResult = (movie) => {
	let listHTML = `<table class="table">
		<tr>
			<th>ID</th>
			<th>Nombre</th>
			<th>Apellido</th>
			<th>Fecha de nacimiento</th>
			<th>Telefono</th>
			<th>Pais</th>
			<th>Ciudad</th>
			<th>Direccion</th>
			<th>Codigo Postal</th>
		</tr>
		`;
	movie.forEach((movie) => {
		listHTML += `
		<tr>
			<td>${movie.id}</td>
			<td>${movie.title}</td>
			
			<td><button type="button" class="btn btn-primary" onclick="openModalEdit(${movie.id})">Editar</button></td>
			<td><button type="button" class="btn btn-primary" onclick="openModalConfirm(${movie.id})">Eliminar</button></td>
		</tr>
    `;
	});
	listHTML += `</table>`;
	customerList.innerHTML = listHTML;
};

/* const addCustomer = () => {
	const formData = new FormData(document.querySelector("#formAdd"));

	document.querySelector("#msgFormAdd").innerHTML = "";

	const customer = {
		name: formData.get("name"),
		surname: formData.get("surname"),
		birthdate: formData.get("bithdate"),
		phone: formData.get("phone"),
		country: formData.get("country"),
		city: formData.get("city"),
		direction: formData.get("direction"),
		postCode: formData.get("postCode"),
	};

	console.log(customer);

	fetch(
		`${API_URL}/add?name=${customer.name}
		&surname=${customer.surname}
		&birthdate=${customer.birthdate}
		&phone=${customer.phone}
		&country=${customer.country}
		&city=${customer.city}
		&direction=${customer.direction}
		&postCode=${customer.postCode}`,
		{
			method: "POST",
			body: JSON.stringify(customer),
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
			getCustomer();
		});
};

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

const deleteProduct = (deleteId) => {
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
			getCustomer();
			deleteId = null;
		});
};

const confirmDelete = (res) => {
	if (res) {
		deleteProduct(deleteId);
	} else {
		closeModalConfirm();
	}
}; */

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
