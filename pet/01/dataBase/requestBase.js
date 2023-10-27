const { Client } = require('pg');


const data = {
    user: 'postgres',
    host: 'localhost',
    database: '',
    password: 'postgres',
    port: 5432,
};



// создание базы
(async () => { 
    let client = new Client(data);
    client.connect();  
    await client.query('CREATE DATABASE teldirect')
        .then(async () => console.log("База создалась"))
        .catch((error) => console.log(error.message, 1));

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
        .then(() => console.log('таблица создалась'))
        .catch((error) => console.log(error.message, 2));
    process.exit();    
    
})();