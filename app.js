const Koa = require('koa');
const KoaStatic = require('koa-static');

const phoneBookRoute = require('./routes/phoneBook.route');
const errorCathcer = require('./middleware/error.cather');

const app = new Koa();

app.use(errorCathcer);
app.use(KoaStatic('./html'));
app.use(phoneBookRoute);

module.exports = app;
