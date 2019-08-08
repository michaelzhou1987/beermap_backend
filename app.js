const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const ejs = require('ejs');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// allow cross-origin requests
const cors = require('cors');
app.use(cors());

// graphql
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema/index');
const rootValue = require('./graphql/resolvers/index');

const isAuth = require('./middleware/is-auth');

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

// mongodb
const mongoose = require('mongoose');
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@149.28.246.217:27017/beermap`
);
mongoose.connection.once('open', ()=>{
  console.log('connected to database')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

