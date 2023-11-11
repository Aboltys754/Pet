const config = require('./config');

const app = require('./app');

app.listen(config.server.port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`start server ${config.server.port}`);
});
