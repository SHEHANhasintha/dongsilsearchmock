var express = require('express');
const fs = require('fs')

var router = express.Router();

/* GET home page. */
router.post('/search-ingredients', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  let output = [];

  console.log(req.body)

  try {


let rawdata = fs.readFileSync('mockDataSearch.json');
let dataLst = JSON.parse(rawdata);

    var arrayLength = dataLst.length;
    for (var i = 0; i < arrayLength; i++) {
      // console.log(dataLst[i]);
      if(dataLst[i].name.startsWith(req.body.search)){
      // console.log(dataLst[i].startsWith('e'));

        output.push(dataLst[i].name);
      }

    }



    // console.log(output)
  } catch (err) {
    console.error(err)
  }

  console.log("dddd")
  res.json(200, { "ds": "dfdfdfd" })
});

// app.use('/search-ingredients',() => {
//   res.send("success");
// })



module.exports = router;
