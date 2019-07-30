var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose')

var path = require('path');

var indexRouter = require('./routes/index');

require('dotenv').config()

var app = express();

// Require GraphQL server packages
const { ApolloServer } = require('apollo-server-express')

const { typeDefs } = require('./graphql/schema')
const { resolvers } = require('./graphql/resolvers')

const depthLimit = require('graphql-depth-limit')

// Create ApolloServer Instance
const apollo = new ApolloServer({ typeDefs, resolvers, validationRules: [depthLimit(3)] })

// Add Apollo Server Middleware
apollo.applyMiddleware({ app, path: '/graphql'})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Conectado a mongoDB')
  }).catch((err) => {
    console.log('Falló la conexión a MongoDB: ', err.message)
  })

// Express Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
