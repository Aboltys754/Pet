const { Client } = require('pg');


const data = {
    user: 'postgres',
    host: 'localhost',
    database: 'teldirect',
    password: 'postgres',
    port: 5432,
};


// Добавление в базу
async function addContact(name, tel) {
    let client = new Client(data);
    client.connect();

    await client.query(`INSERT INTO contacts (name, tel) VALUES ('${name}', '${tel}');`)
        .then(() => console.log('Запись создана'))
        .catch((error) => console.log(`Данные не добавлены, ошибка: ${error.message}`))
        .finally(() => process.exit());
};

// Удаление из базы
async function dropContact(id) {
    let client = new Client(data);
    client.connect();

    await client.query(`DELETE FROM contacts WHERE id='${id}';`)
        .then(() => console.log('Запись удалена'))
        .catch((error) => console.log(`Данные не удалены, ошибка: ${error.message}`))
        .finally(() => process.exit());
};

// изменение в базе
async function changeContact() {
    let client = new Client(data);
    client.connect();

    await client.query(`DELETE FROM contacts WHERE id='${id}';`)
        .then(() => console.log('Запись изменена'))
        .catch((error) => console.log(`Данные не изменены, ошибка: ${error.message}`))
        .finally(() => process.exit());
}

// addContact('вася', '+79525173357');
dropContact(2);