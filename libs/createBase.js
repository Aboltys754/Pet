const { Client } = require('pg');


const data = {
    user: 'postgres',
    host: 'localhost',
    database: '',
    password: 'postgres',
    port: 5432,
};



// создание базы и таблицы
(async () => { 
    let client = new Client(data);
    client.connect();
    
    await client.query('DROP DATABASE teldirect')
        .then(async () => console.log("База удалена"))
        .catch((error) => console.log(`База не удалена, ошибка: ${error.message}`));

    await client.query('CREATE DATABASE teldirect')
        .then(async () => console.log("База создалась"))
        .catch((error) => console.log(`База не создалась, ошибка: ${error.message}`));

    data.database = 'teldirect';
    
    client = new Client(data);
    client.connect();

    await client.query(`
        CREATE TABLE contacts (
            id SERIAL,
            name text NOT NULL,
            tel text NOT NULL
        );
    `)
        .then(() => console.log('Таблица создалась'))
        .catch((error) => console.log(`Таблица не создалась, ошибка:${error.message}`));
    process.exit();    
    
})();