require('dotenv').config({ path: './secret.env' });

module.exports = {
  node: process.env.NODE_ENV || 'dev',
  postgres: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'teldirect',
    password: process.env.DB_PASS || 'postgres',
    port: process.env.DB_PORT || 5432,
  },
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3000,
  },

};
