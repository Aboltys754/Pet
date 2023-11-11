const Koa = require('koa');

const phoneBookRoute = require('./routes/phoneBook.route');
const errorCathcer = require('./middleware/error.cather');

const app = new Koa();

app.use(errorCathcer);
app.use(phoneBookRoute);

module.exports = app;
