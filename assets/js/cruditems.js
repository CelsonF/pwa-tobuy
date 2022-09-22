let items = [];

onload = () => {
	const itemsRegistred = JSON.parse(localStorage.getItem('items'));

	if (itemsRegistred)
		items = itemsRegistred;

	displayItems();

	document.querySelector("#input-item").oninput = observerInputAdd;
	document.querySelector("#input-update").oninput = observerInputUpdate;

	/*Função de adicionar*/
	document.querySelector("#btn-add").onclick = () => {
		document.querySelector("#btn-register").disabled = true;
		activeScreen("screen-2")
		document.querySelector("#input-update").focus();
	}

	/*Função de cancelar registro do produto*/
	document.querySelector("#cancel-register").onclick = () => {
		document.querySelector("#input-update").value = '';
		activeScreen("screen-1")
	};

	/*Função de cancelar update do produto*/
	document.querySelector('#cancel-update').onclick = () => {
		let campo = document.querySelector("#input-update");
		campo.value = "";
		campo.removeAttribute("data-id");
		activeScreen("screen-1")
	};

	document.querySelector("#btn-register").onclick = () => {
		addItems();
	};

	document.querySelector("#btn-update").onclick = () => {
		updateItem();
	};

	document.querySelector("#btn-delete").onclick = () => {
		deleteItem();
	};
}



/*CRUD*/
const addItems = () => {
	let campo = document.querySelector("#input-item");
	let quantidade = document.querySelector("#input-qtd");
	let tipoSelecionado = document.querySelector("#input-type");


	let descricao = campo.value;

	if (descricao != '') {
		items.push({
			id: Math.random().toString().replace('0.', ''),
			descricao: descricao,
			qtd: quantidade.value,
			tipoProduto: tipoSelecionado.options[tipoSelecionado.selectedIndex].value,
		});
		campo.value = '';
		quantidade.value = '';
		tipoSelecionado.options[tipoSelecionado.selectedIndex = 0]

		activeScreen("screen-1")
		saveItems();
		displayItems();
	}
};



const displayItems = () => {
	const listItems = document.querySelector('#list-items');
	let removeProp = document.querySelector("#blank")

	listItems.innerHTML = '';

	if (items.length > 0) {
		removeProp.classList.remove('no-product')
	}
	else {
		removeProp.classList.add('no-product')
	}


	items.forEach((produto) => {
		let elemItems = document.createElement('li');
		elemItems.innerHTML = `<strong> ${produto.descricao}</strong>  <br> <p> Quantidade - ${produto.qtd} </p>  <br> <p> Tipo: ${produto.tipoProduto} </p>`;
		elemItems.setAttribute('data-id', produto.id);
		elemItems.onclick = () => {
			let campo = document.querySelector("#input-update");
			activeScreen('screen-3');
			campo.value = produto.descricao;
			campo.setAttribute('data-id', produto.id);
			campo.focus();
		};
		listItems.appendChild(elemItems);
	});
	document.querySelector('#estado').innerText = items.length;
	if (items.length > 0) {
		listItems.classList.remove('hidden');
		document.querySelector('#blank').classList.add('hidden');
	} else {
		listItems.classList.add('hidden');
		document.querySelector('#blank').classList.remove('hidden');
	}
};



const activeScreen = (comp) => {
	let listScreen = document.querySelectorAll('body > .component');
	listScreen.forEach((c) => c.classList.add('hidden'));
	document.querySelector('#' + comp).classList.remove('hidden');
};

const observerInputAdd = (e) => {
	let botao = document.querySelector('#btn-register');
	if (e.target.value.length > 0) botao.disabled = false;
	else botao.disabled = true;
};


const observerInputUpdate = (e) => {
	let botao = document.querySelector('#btn-update');
	if (e.target.value.length > 0) botao.disabled = false;
	else botao.disabled = true;
};


const updateItem = () => {
	let campo = document.querySelector("#input-update");
	let idItem = campo.getAttribute('data-id');
	let i = items.findIndex((produto) => produto.id == idItem);
	items[i].descricao = campo.value;
	campo.value = '';
	campo.removeAttribute('data-id');
	activeScreen("screen-1")
	saveItems();
	displayItems();
};

const deleteItem = () => {
	let campo = document.querySelector("#input-update");
	let idItem = campo.getAttribute('data-id');
	items = items.filter((produto) => produto.id != idItem);
	campo.value = '';
	campo.removeAttribute('data-id');
	activeScreen("screen-1")
	saveItems();
	displayItems();
};



const saveItems = () => {
	localStorage.setItem("items", JSON.stringify(items));
}
