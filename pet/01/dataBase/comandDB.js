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
        .then((val) => {
            if (val.rowCount === 0) {
                throw new Error('Запись не найдена');
            }
            console.log('Запись удалена');
        })
        .catch((error) => console.log(`Данные не удалены, ошибка: ${error.message}`))
        .finally(() => process.exit());
};

// изменение в базе
async function changeContact(id, name, tel) {
    let client = new Client(data);
    client.connect();

    await client.query(`UPDATE contacts SET name='${name}', tel='${tel}' WHERE id='${id}';`)
        .then((val) => {
            if (val.rowCount === 0) {
                throw new Error('Запись не найдена');
            }
            console.log('Запись изменена')
        })
        .catch((error) => console.log(`Данные не изменены, ошибка: ${error.message}`))
        .finally(() => process.exit());
}

// Чтение из базы
async function readingContacts() {
        let client = new Client(data);
        client.connect();

        return client.query(`select * from contacts;`)
            .then((value) => value.rows)
            .catch((error) => console.log('Данные не получены, ошибка: ', error))
            .finally(() => process.exit())
}


// addContact('вася', '+79525173357');
// dropContact(5);
// changeContact(7, 'dfgfd', '65644654646');
let foo = readingContacts();

console.log(foo);