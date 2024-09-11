import { port, server } from './app.mjs'


export const normalizePort = (val) => {
  const port = parseInt(val, 10)
  if(isNaN(port)) {
    return val
  }if(port >= 0){
    return port
  }
  return false
}

export const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`Listening on ${bind}`);
}

export const handle404 = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err)
}

