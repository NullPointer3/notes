import { default as express} from 'express';
import { default as hbs } from 'hbs';
import * as path from 'path';
//import * as favicon from 'serve-favicon';
import { default as logger} from 'morgan';
import { default as cookieParser} from 'cookie-parser';
import { default as bodyParser} from 'body-parser';
import * as http from 'http';
import { approotdir } from './approotdir.mjs';
import { 
  handle404, 
  normalizePort, 
  onError, 
  onListening 
} from './appsupport.mjs';
import { router as indexRouter } from './routes/index.mjs';

const __dirname = approotdir
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use(handle404)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export const port = normalizePort(process.env.PORT || '3000');
app.set(port, 'port');

export const server = http.createServer(app)

server.listen(port)
server.on('error', onError);
server.on('listening', onListening)

export default app
