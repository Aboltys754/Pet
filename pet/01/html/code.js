const tableMenu = document.getElementById('table-menu');
const topMenu = document.getElementById('top-menu');
const formNewContact = document.getElementById('formNewContact');
const createForm = document.getElementById('create-form');
const nameError = document.querySelector('#name + span.error');
const telError = document.querySelector('#tel + span.error');

// флаг, id, значение первого p, значение второго p
const activAtrribute = [false, null, null, null];

// Запрос на сервер и на основе полученных данных отрисовка таблицы контактов
async function get_table_contact() {
  const res = await fetch('http://localhost:3000/createTableContact', {
  });
  if (res.ok) {
    const json = await res.json();
    tableMenu.textContent = '';
    sessionStorage.storeJson = JSON.stringify(json);
    create_table_contact();
  }
}

get_table_contact();

// Отрисовка на странице таблицы на основе данных взятых из sessionStorage
async function create_table_contact() {
  const data_contact = JSON.parse(sessionStorage.storeJson);
  tableMenu.innerHTML = "";
  await data_contact.map((value) => {
    createTegsTable(value);
  });
}

// Скрывает форму таблицы контактов и отображение формы создания нового контакта
async function add_contact() {
  const inputName = document.getElementById('name');
  const inputTel = document.getElementById('tel');

  inputName.value = '';
  inputTel.value = '';
  nameError.textContent = '';
  telError.textContent = '';

  topMenu.classList.toggle('hidden');
  tableMenu.classList.toggle('hidden');
  createForm.classList.toggle('hidden');
}

// Запрос на добовление нового контакта
async function submit_contact() {
  const inputName = document.getElementById('name');
  const inputTel = document.getElementById('tel');

  if (inputName.validity.valueMissing) {
    nameError.textContent = 'Пустое поле';
    return;
  }
  if (inputTel.validity.valueMissing) {
    telError.textContent = 'Пустое поле';
    return;
  }

  const respon = await fetch('http://localhost:3000/addContact', {
    method: 'POST',
    body: new FormData(formNewContact),
  });
  if (respon.ok) {
    await create_table_contact();
    topMenu.classList.toggle('hidden');
    tableMenu.classList.toggle('hidden');
    createForm.classList.toggle('hidden');
  } else if (respon.status === 400) {
    const error = await respon.text();
    if (error === 'first element') {
      telError.textContent = 'Телефон должен начинаться с символа + или числа 8';
      return false;
    }
    if (error === 'second element') {
      telError.textContent = 'Символы в телефоне не цифры со второго символа';
      return false;
    }
    if (error === 'litеl tel') {
      telError.textContent = 'Слишком короткий телефон';
      return false;
    }
    if (error === 'long tel') {
      telError.textContent = 'Слишком длинный телефон';
      return false;
    }
  }

  
}

function openFormEdit(event, elem = 'editButton') {
  // Если форма уже открыта на каком то элементе то она закрывается
  if (activAtrribute[0] === true) {
    const oldAttribute = document.getElementById(`${activAtrribute[1]}`);
    oldAttribute.textContent = '';

    const divTable = document.createElement('div');
    const divButton = document.createElement('div');

    divTable.className = 'table';
    divTable.insertAdjacentHTML('beforeend', `<p id="p1-${activAtrribute[1]}">${activAtrribute[2]}</p>`);
    divTable.insertAdjacentHTML('beforeend', `<p id="p2-${activAtrribute[1]}">${activAtrribute[3]}</p>`);

    divButton.className = 'button';
    divButton.insertAdjacentHTML('beforeend', '<button><img src="./img/edit.svg" alt="изменить" onclick="openFormEdit(event)"> </button>');
    divButton.insertAdjacentHTML('beforeend', '<button><img src="./img/delete.svg" alt="удалить" onclick="delet_contact(event)"> </button>');

    oldAttribute.append(divTable);
    oldAttribute.append(divButton);

    activAtrribute[0] = false;
    activAtrribute[1] = null;
    activAtrribute[2] = null;
    activAtrribute[3] = null;
    // если нажимают кнопку отмена в открытой форме
    if (elem === 'cancelButton') {
      return;
    }
  }

  // Если форма ни где не открыта то открывается на выбранном элементе
  if (activAtrribute[0] === false && elem !== 'cancelButton') {
    const getElementsubscriber = event.target.parentElement.parentElement.parentElement;
    const contactId = getElementsubscriber.getAttribute('id');
    const p1 = document.getElementById(`p1-${contactId}`);
    const p2 = document.getElementById(`p2-${contactId}`);
    const p1Value = p1.textContent;
    const p2Value = p2.textContent;

    activAtrribute[0] = true;
    activAtrribute[1] = contactId;
    activAtrribute[2] = p1Value;
    activAtrribute[3] = p2Value;

    getElementsubscriber.firstChild.textContent = '';
    getElementsubscriber.firstChild.removeAttribute('class');
    getElementsubscriber.firstChild.setAttribute('class', 'tableEdit');
    getElementsubscriber.firstChild.insertAdjacentHTML('beforeend', '<label for="name">Введите Имя Контакта: </label>');
    getElementsubscriber.firstChild.insertAdjacentHTML('beforeend', `<input type="text" name="name" id="nameEdit-${contactId}"  oninput="deletErrorText(event)" value='${p1Value}' required/>`);
    getElementsubscriber.firstChild.insertAdjacentHTML('beforeend', '<span class="error" aria-live="polite"></span>');

    getElementsubscriber.lastChild.textContent = '';
    getElementsubscriber.lastChild.removeAttribute('class');
    getElementsubscriber.lastChild.setAttribute('class', 'tableEdit');
    getElementsubscriber.lastChild.insertAdjacentHTML('beforeend', '<label for="name">Введите номер телефона: </label>');
    getElementsubscriber.lastChild.insertAdjacentHTML('beforeend', `<input type="text" name="telEdit" id="telEdit-${contactId}" oninput="deletErrorText(event)" value='${p2Value}' required/>`);
    getElementsubscriber.lastChild.insertAdjacentHTML('beforeend', '<span class="error" aria-live="polite"></span>');

    getElementsubscriber.insertAdjacentHTML('beforeend', `<button id='buttonEdit-${contactId}' onclick='editContact()'>Подтвердить изменения</button>`);
    getElementsubscriber.insertAdjacentHTML('beforeend', '<button  class=\'editButton\' onclick=\'openFormEdit(event, "cancelButton")\'>Отмена</button>');
  }
}

// отправка данных для изменения контакта
async function editContact() {
  const name = document.getElementById(`nameEdit-${activAtrribute[1]}`);
  const tel = document.getElementById(`telEdit-${activAtrribute[1]}`);

  if (name.value.length === 0) {
    name.nextSibling.textContent = 'Поле не может быть пустым';
    return;
  }
  const respon = await fetch('http://localhost:3000/editContact', {
    method: 'PATCH',
    body: JSON.stringify({
      id: activAtrribute[1],
      name: name.value,
      tel: tel.value,
    }),
  });
  if (respon.ok) {
    activAtrribute[0] = false;
    activAtrribute[1] = null;
    activAtrribute[2] = null;
    activAtrribute[3] = null;
    await get_table_contact();
  }
}

// отправка данных для удаление контакта
async function delet_contact(event) {
  const elemId = event.target.parentElement.parentElement.parentElement.getAttribute('id');
  if (confirm('Вы точно хотите удалить контакт?') === true) {
    const respon = await fetch(`http://localhost:3000/deleteContact/${elemId}`, {
      method: 'DELETE',
    });

    if (respon.ok) {
      await get_table_contact();
    }
  }
}


// создание елемента таблицы subscriber
function createTegsTable(value) {
  const divSubscriber = document.createElement('div');
  const divTable = document.createElement('div');
  const divButton = document.createElement('div');

  divTable.className = 'table';
  divTable.insertAdjacentHTML('beforeend', `<p id="p1-${value.id}">${value.name}</p>`);
  divTable.insertAdjacentHTML('beforeend', `<p id="p2-${value.id}">${value.tel}</p>`);

  divButton.className = 'button';
  divButton.insertAdjacentHTML('beforeend', '<button><img src="./img/edit.svg" alt="изменить" onclick="openFormEdit(event)"> </button>');
  divButton.insertAdjacentHTML('beforeend', '<button><img src="./img/delete.svg" alt="удалить" onclick="delet_contact(event)"> </button>');

  divSubscriber.className = 'subscriber';
  divSubscriber.id = value.id;
  divSubscriber.append(divTable);
  divSubscriber.append(divButton);

  tableMenu.append(divSubscriber);
}

// удаление текста из полей ошибок
function deletErrorText(event) {
  if (event.target.getAttribute('id') === 'name' || event.target.getAttribute('id') === 'tel') {
    event.target.nextSibling.nextSibling.textContent = '';
    return;
  }
  event.target.nextSibling.textContent = '';
}

// поиск по набраному тексту
function search_contact(event) {
  const data_contact = JSON.parse(sessionStorage.storeJson);
  const result = [];
  for (let i = 0; i < data_contact.length; i++) {
    if (data_contact[i].name.indexOf(event.target.value) !== -1) {
      result.push(data_contact[i]);
    }
  }
  tableMenu.textContent = '';
  result.map((value) => {
    createTegsTable(value);
  });
}
