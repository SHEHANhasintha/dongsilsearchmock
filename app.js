var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


const corsOptions = {
  origin: "*",
  // credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use('/', indexRouter);

// app.use('/', function(req, res, next) {

// });

let rawdata = fs.readFileSync('mockDataSearch.json');
let dataLst = JSON.parse(rawdata);

app.post('/search-ingredients', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  let output = [];

  console.log(req.body.search)

  try {

    var arrayLength = dataLst.length;
    for (var i = 0; i < arrayLength; i++) {
      if (output.length > 100) {
        break;
      }

      // console.log(dataLst[i].name.toLowerCase().startsWith('청'));

      // console.log(dataLst[i]);
      if (dataLst[i].name.toLowerCase().startsWith(req.body.search.toLowerCase())) {
      // console.log(dataLst[i].startsWith('e'));

        output.push(dataLst[i]);
      }

    }
    // console.log(output)

  } catch (err) {
    console.error(err)
    return (res.end(400))
  }

  res.json(200, output)
});


app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});




// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
