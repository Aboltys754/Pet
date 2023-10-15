const tableMenu = document.getElementById('table-menu');
const topMenu = document.getElementById('top-menu');
const formNewContact = document.getElementById('formNewContact');
const name = document.getElementById('name');
const tel = document.getElementById('tel');
const nameError = document.querySelector("#name + span.error");
const telError = document.querySelector("#tel + span.error");


name.addEventListener("input", function (event) {
    console.log(event.target)
    // Каждый раз, когда пользователь что-то вводит,
    // мы проверяем, являются ли поля формы валидными
  
    if (name.validity.valid) {
      // Если на момент валидации какое-то сообщение об ошибке уже отображается,
      // если поле валидно, удаляем сообщение
      nameError.textContent = ""; // Сбросить содержимое сообщения
      nameError.className = "error"; // Сбросить визуальное состояние сообщения
    } else {
      // Если поле не валидно, показываем правильную ошибку
    //   showError();
        Console.log("asdas")
    }
  });


async function add_contact() {
    const tableMenu = document.getElementById('table-menu');
    const topMenu = document.getElementById('top-menu');
    const formNewContact = document.getElementById('formNewContact');
    topMenu.classList.toggle('hidden');
    tableMenu.classList.toggle('hidden');
    formNewContact.classList.toggle('hidden');
};

async function submit_contact() {    
    const tableMenu = document.getElementById('table-menu');
    const topMenu = document.getElementById('top-menu');
    const formNewContact = document.getElementById('formNewContact');
    const name = document.getElementById('name');
    const tel = document.getElementById('tel');
    const nameError = document.querySelector("#name + span.error");
    const telError = document.querySelector("#tel + span.error");

    console.log(name.value.length)
    if (name.validity.valueMissing) {
        nameError.textContent = "Пустое поле"
        return
    }
    if (tel.validity.valueMissing) {
        telError.textContent = "Пустое поле"
        return
    }

    topMenu.classList.toggle('hidden');
    tableMenu.classList.toggle('hidden');
    formNewContact.classList.toggle('hidden');
    
    let respon = await fetch(`http://localhost:3000/?name=${name.value}&tel=${tel.value}`);
    // if (respon.ok) {
    //     window.location.href = 'http://localhost:3000/'
    // }
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