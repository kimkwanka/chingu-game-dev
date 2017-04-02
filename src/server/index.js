import http from 'http';
import app from './server';
import socketIO from './socketIO';

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

const io = require('socket.io')(server);

let currentSocketIO = socketIO;
let currentApp = app;

server.listen(PORT, () => {
  console.log(`Express server running at ${PORT} in ${process.env.NODE_ENV || 'dev'} mode`);
});
io.on('connection', socketIO);

// Handle hot module replacement
if ((process.env.NODE_ENV !== 'production') && module.hot) {
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
  module.hot.accept('./socketIO', () => {
    io.removeListener('connection', currentSocketIO);
    io.on('connection', socketIO);
    currentSocketIO = socketIO;
  });
}
