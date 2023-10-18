const tableMenu = document.getElementById('table-menu');
const topMenu = document.getElementById('top-menu');
const formNewContact = document.getElementById('formNewContact');
const nameError = document.querySelector("#name + span.error");
const telError = document.querySelector("#tel + span.error");


// Запрос на сервер и на основе полученных данных отрисовка таблицы контактов
async function create_table_contact() {
    const table_contact = []
    let res = await fetch ('http://localhost:3000/', {
        method: 'POST',
        headers: {
            Authentication: 'createTable'
        }
    })
    if (res.ok) {
        let json = await res.json();
        tableMenu.textContent = '';
        json.map((value, index) => {
            let divSubscriber = document.createElement('div');
            let divTable = document.createElement('div');
            let divButton = document.createElement('div');           

            divTable.className = 'table';
            divTable.insertAdjacentHTML('beforeend', `<p>${value.name}</p>`);
            divTable.insertAdjacentHTML('beforeend', `<p>${value.tel}</p>`);

            divButton.className = 'button';
            divButton.insertAdjacentHTML('beforeend', '<button><img src="./img/edit.svg" alt="изменить" onclick="edit_contact()"> </button>')
            divButton.insertAdjacentHTML('beforeend', '<button><img src="./img/delete.svg" alt="удалить" onclick="delet_contact()"> </button>')

            divSubscriber.className = 'subscriber';
            divSubscriber.id = value.id
            divSubscriber.append(divTable);
            divSubscriber.append(divButton);
            
            tableMenu.append(divSubscriber);
        })
    }
};

create_table_contact();


// Скрывает форму таблицы контактов и отображение формы создания нового контакта
async function add_contact() {
    const tableMenu = document.getElementById('table-menu');    
    const formNewContact = document.getElementById('formNewContact');
    const inputName = document.getElementById('name');
    const inputTel = document.getElementById('tel');
    const nameError = document.querySelector("#name + span.error");
    const telError = document.querySelector("#tel + span.error");

    inputName.value = '';
    inputTel.value = '';
    nameError.textContent = '';
    telError.textContent = '';

    topMenu.classList.toggle('hidden');
    tableMenu.classList.toggle('hidden');
    formNewContact.classList.toggle('hidden');
};


// Запрос на добовление нового контакта
async function submit_contact() {    
    const tableMenu = document.getElementById('table-menu');
    const topMenu = document.getElementById('top-menu');
    const formNewContact = document.getElementById('formNewContact');
    const name = document.getElementById('name');
    const tel = document.getElementById('tel');
    const nameError = document.querySelector("#name + span.error");
    const telError = document.querySelector("#tel + span.error");

    if (name.validity.valueMissing) {
        nameError.textContent = "Пустое поле"
        return
    }
    if (tel.validity.valueMissing) {
        telError.textContent = "Пустое поле"
        return
    }

    let respon = await fetch(`http://localhost:3000/`, {
        method: 'POST',
        headers: {
            Authentication: 'createContact'
        },
        body: new FormData(formNewContact)
    });
    if (respon.ok) {
        // await create_table_contact();
        console.log(111)
    }

    topMenu.classList.toggle('hidden');
    tableMenu.classList.toggle('hidden');
    formNewContact.classList.toggle('hidden');
    
    
}

function inputName() {
    document.querySelector('#tel + span.error').textContent = ''
}
function inputTel() {
    document.querySelector('#tel + span.error').textContent = ''
}

function edit_contact() {
    alert("Редактировать контакт")
};

function delet_contact() {
    alert('Удалить контакт')
};