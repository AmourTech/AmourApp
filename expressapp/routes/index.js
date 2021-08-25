var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Lots of routes available' });
 });

router.get("/api/clients", function (req, res, next) {
  req.db.from('client').select('clientname').groupBy('clientname')
    .then((rows) => {
      res.json(rows)
    })
  .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
  })
});

module.exports = router;