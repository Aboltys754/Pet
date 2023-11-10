const { Client } = require('pg');
const config = require('../config');

const data = {
  user: config.postgres.user,
  host: config.postgres.host,
  database: '',
  password: config.postgres.password,
  port: config.postgres.port,
};

// создание базы и таблицы
(async () => {
  let client = new Client(data);
  client.connect();

  await client.query(`DROP DATABASE ${config.postgres.database}`)
    .then(async () => console.log('База удалена'))
    .catch((error) => console.log(`База не удалена, ошибка: ${error.message}`));

  await client.query(`CREATE DATABASE ${config.postgres.database}`)
    .then(async () => console.log('База создалась'))
    .catch((error) => console.log(`База не создалась, ошибка: ${error.message}`));

  data.database = config.postgres.database;

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
