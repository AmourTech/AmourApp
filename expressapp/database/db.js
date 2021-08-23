const mysql = require('mysql');
const connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'Qwer77df88',
 database : 'clients'
});

connection.connect(function (err) {
  if (err) throw err;
});


module.exports = connection
// module.exports = (req, res, next) => {
//   req.db = connection;
//   next()
// }