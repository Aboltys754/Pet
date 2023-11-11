const config = require('./config');

const app = require('./app');
const phoneBookRoute = require('./routes/phoneBook.route');

app.use(phoneBookRoute);

app.listen(config.server.port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`start server ${config.server.port}`);
});
