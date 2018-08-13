const server = require('./server/index');

server.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}.`);
});
