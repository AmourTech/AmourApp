const mysql = require('mysql');
const connection = mysql.createConnection({
 host     : 'localhost',
 
 //Boyi//
 user     : 'root',
 password : 'Qwer77df88',
 database : 'clients'

 //Yaza//
//user        : 'newuser',
//password    : 'pass1',
//database    : 'amourapp'
});

connection.connect(function (err) {
  if (err) throw err;
});


module.exports = connection
// module.exports = (req, res, next) => {
//   req.db = connection;
//   next()
// }