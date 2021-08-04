const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '',
  port : '',
  user: '',
  password: '',
  database: ''
});

connection.connect(function (err) {
  if (err) throw err;
});



module.exports = (req, res, next) => {
  req.db = connection;
  next()
}