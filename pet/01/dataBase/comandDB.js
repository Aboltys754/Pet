const { Client } = require('pg');


const data = {
    user: 'postgres',
    host: 'localhost',
    database: 'teldirect',
    password: 'postgres',
    port: 5432,
};


// Добавление в базу
module.exports.addContact = async (name, tel) => {
    let client = new Client(data);
    client.connect();

    await client.query(`INSERT INTO contacts (name, tel) VALUES ('${name}', '${tel}');`)
        .then(() => console.log('Запись создана'))
        .catch((error) => console.log(`Данные не добавлены, ошибка: ${error.message}`))
        .finally(() => process.exit());
};

// Удаление из базы
module.exports.dropContact = async(id) => {
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
module.exports.changeContact = async(id, name, tel) => {
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
module.exports.readingContacts = async() => {
            let client = new Client(data);
            client.connect();

            return  await client.query(`select * from contacts;`)
            .then((value) => value.rows)
            .catch((error) => console.log('Данные не получены, ошибка: ', error))
        
    }

// console.log(readingContacts());

// addContact('вася', '+79525173357');
// dropContact(5);
// changeContact(7, 'dfgfd', '65644654646');