var express = require('express');
var app = express();




var router = express.Router();
var db = require( "../database/db.js" );

var crypto = require('crypto');
const nodemailer = require('nodemailer');


router.post('/customerportal',function(req,res,next){

	if (req.body.email == '') {
		res.status(400).send('no email')
	}
	const token = crypto.randomBytes(20).toString('hex');
	const expires = Date.now() + 3600000;
	
	db.query('UPDATE pro SET token = ?, expiry = ? where id=?', [token, expires, req.query.id],function (err, result) {
		if(err){
		 console.log('[INSERT ERROR] - ',err.message);
 res.send('0');
		 return;
		}
	console.log(result)
	res.send('1');
	});

	const transporter = nodemailer.createTransport({
		service:'gmail',
		auth: {
			user: "emaileramapp@gmail.com",
			pass: "amourapp1!",
		},
	});
	const mailOptions = {
		from: 'emaileramapp@gmail.com',
		to: req.body.email,
		subject: 'Link to Accept or Refuse proposal',
		text:
		"You are receiving this because you've been sent a proposal. \n\n"
		+'Please click the following link, or past into your browser within one hour of receiving it: \n\n'
		+'http://localhost:3001/viewproposal/' + token + '\n\n',
	};
	transporter.sendMail(mailOptions, (err, response) => {
		if (err) {
			console.error('there was an error');
		}
		else {
			console.log('res:', response);
			res.status(200).json('email sent');
		}
	});
})






/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getservo',function(req,res,next){

    	db.query('SELECT * FROM service WHERE Organisation = ?', [req.query.id],function (error, results, fields) {
			if(error){
				console.log('[INSERT ERROR] - ',error.message);
				res.send('0');
				return;
			   }
		
			res.send(results)
		
});
})
router.get('/getterm',function(req,res,next){

	db.query('SELECT * FROM terms WHERE Organisation = ?', [req.query.id],function (error, results, fields) {
		if(error){
			console.log('[INSERT ERROR] - ',error.message);
			res.send('0');
			return;
		   }
	
		res.send(results)
	
});
})
router.post('/updateservo', function(req, res, next) {
	var data = req.body
	
	
	
	console.log(data)
	db.query('UPDATE service SET DBill = ?, TaxRate = ?, XeroAccount=?, Spay =?, Cpay =?, Rpay =?, Sname = ?, SDesc = ? where ID=?', [data.Dbill,data.TRate,data.Xero,data.Spay,data.Cpay,data.Rpay,data.Sname,data.SDesc,data.id],function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ',err.message);
			 res.send('0');
	         return;
	        }
					
		  console.log(result)
	 
	      res.send('1');
	});
	
	
});
router.post('/updateterm', function(req, res, next) {
	var data = req.body
	
	
	
	console.log(data)
	db.query('UPDATE `terms` SET Terms = ?, TermName = ?, TermDesc = ? where TermID=?', [data.Terms,data.TName,data.TDesc,data.Tid],function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ',err.message);
			 res.send('0');
	         return;
	        }
					
		  console.log(result)
	 
	      res.send('1');
	});
	
	
});
router.post('/addservo', function(req, res, next) {
	var data = req.body
	
	
	
	console.log(data)
	var addSql ='INSERT INTO service(Organisation, DBill, TaxRate, XeroAccount, Spay, Cpay, Rpay, Sname, SDesc) VALUES (?,?,?,?,?,?,?,?,?)' ;
	var addSqlParam = [data.org, data.Dbill,data.TRate,data.Xero,data.Spay,data.Cpay,data.Rpay,data.Sname,data.SDesc];
	db.query(addSql, addSqlParam,function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ', err.message);
			 res.send('0');
	         return;
	        }
					
		  console.log(result)
	 
	      res.send('1');
	});
	
});
router.post('/addterm', function(req, res, next) {
	var data = req.body
	
	
	
	console.log(data)
	var addSql ='INSERT INTO terms(Organisation, Terms, TermName,TermDesc) VALUES (?,?,?,?)' ;
	var addSqlParam = [data.org, data.TName,data.TDesc,data.Terms];
	db.query(addSql, addSqlParam,function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ', err.message);
			 res.send('0');
	         return;
	        }
					
		  console.log(result)
	 
	      res.send('1');
	});
	
});
router.post('/csvadd',function (req, res, next){
var data = req.body
var addSql = 'INSERT INTO pro(name, client,sdate,edate)'



})



//  POST 请求
router.post('/add', function (req, res, next) {
	
   var data = req.body
   console.log(data.name)
   var  addSql = 'INSERT INTO pro(name, client, sdate, edate, clen, message, acc, pay1, pay2,contact,userid) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?,? , ?,?)';
   var  addSqlParams = [data.name, data.client, data.sdate, data.edate, data.clen, data.message, data.acc, data.pay1, data.pay2, data.contact,data.userid];
   db.query(addSql,addSqlParams,function (err, result) {
           if(err){
            console.log('[INSERT ERROR] - ',err.message);
			res.send('0');
            return;
           }        
    
         res.send('1');
   });
   
   //res.send('Hello POST'+data);
})




router.post('/addprophelp', function (req, res, next) {
	
	var data = req.body
	console.log(data.name)
	var  addSql = 'INSERT INTO pro(ProposalID,ServiceID) VALUES ( req.ProposalID, req.ServiceID)';
	var  addSqlParams = [data.name, data.client, data.sdate, data.edate, data.clen, data.message, data.acc, data.pay1, data.pay2, data.contact,data.userid];
	db.query(addSql,addSqlParams,function (err, result) {
			if(err){
			 console.log('[INSERT ERROR] - ',err.message);
			 res.send('0');
			 return;
			}        
	 
		  res.send('1');
	});
	
	//res.send('Hello POST'+data);
 })

router.post('/updatepro', function (req, res, next) {
	
	var data = req.body
	console.log(data.name)
	db.query("UPDATE pro SET name = ?, client = ?, sdate = ?, edate = ?, clen = ?, message = ?, acc = ?, pay1 = ?, pay2 = ?,contact = ? WHERE id = ?",[data.na, data.client, data.sda, data.eda, data.cle, data.mes, data.ac, data.py1, data.py2, data.cont, data.id],function (err, results) {
					if(err){
					 console.log('[INSERT ERROR] - ',err.message);
		 res.send('0');
					 return;
					}        
	 
				res.send('1');
				console.log(results)
	});
	
	//res.send('Hello POST'+data);
})

router.post('/answerpro', function (req, res, next) {
	
	var data = req.body
	console.log(data.name)
	db.query("UPDATE pro SET acc = ? WHERE id = ?",[data.ac, data.id],function (err, results) {
					if(err){
					 console.log('[INSERT ERROR] - ',err.message);
		 res.send('0');
					 return;
					}        
	 
				res.send('1');
				console.log(results)
	});
	
	//res.send('Hello POST'+data);
})

router.post('/updateclient', function (req, res, next) {
	
	var data = req.body
	console.log(data.clientname)
	db.query("UPDATE client SET clientname = ?, ABN = ?, ACN = ?, BAddress = ?, BName = ?, BSBAccountNumber = ?, BSBName = ?, Contact = ?, TFN = ?, Type = ? WHERE AccountID = ?",[data.clientname, data.abn, data.acn, data.baddress, data.bname, data.bsbaccountn, data.bsbname, data.contact, data.tfn, data.type, data.id],function (err, results) {
					if(err){
					 console.log('[INSERT ERROR] - ',err.message);
		 res.send('0');
					 return;
					}        
	 
				res.send('1');
				console.log(results)
	});
	
	//res.send('Hello POST'+data);
})


router.get('/find', function(req, res, next) {
	
	//console.log(db)
	db.query('SELECT * FROM pro WHERE userid IN (SELECT UserID FROM user WHERE Organisation = ?)', [req.query.id],function (error, results, fields) {
	  if (error) throw error;
	  //console.log('The solution is: ');
	  console.log(results)
	  res.send(results);
	});
});




router.get('/findprop', function(req, res, next) {
	
	db.query('SELECT * from pro where id = ?', [req.query.id],function (error, results, fields) {
		if (error) throw error;
		json = JSON.stringify(results);
		temp = JSON.parse(json)
		console.log(temp)
		console.log(temp[0].name)
	  var  addSql = 'INSERT INTO pro(name, client, sdate, edate, clen, message, acc, pay1, pay2,userid) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
	  var  addSqlParams = [temp[0].name, temp[0].client, temp[0].sdate, temp[0].edate, temp[0].clen, temp[0].message, temp[0].acc, temp[0].pay1, temp[0].pay2, temp[0].userid];
	  db.query(addSql,addSqlParams,function (err, result) {
			  if(err){
			   console.log('[INSERT ERROR] - ',err.message);
			   res.send('0');
			   return;
			  }        
	   
			res.send('1');
	  });
	});
});
router.get('/findus', function(req, res, next) {
	
	//console.log(db)
	db.query('SELECT * from pro where  userid = ?', [req.query.id],function (error, results, fields) {
	  if (error) throw error;
	  //console.log('The solution is: ');
	  res.send(results);
	});
});

router.get('/findcont', function(req, res, next) {
	
	//console.log(db)
	db.query('SELECT * from contact WHERE organ IN (SELECT userid FROM pro WHERE userid = ?)', [req.query.id],function (error, results, fields) {
	  if (error) throw error;
	  //console.log('The solution is: ');
	  res.send(results);
	});
});

router.get('/viewproposal', function(req, res, next) {
	
	console.log(token)
	db.query('SELECT * from pro where token = ? AND expiry < ?', [req.query.token, Date.now()],function (error, results, fields) {
	  if (error) throw error;
	  //console.log('The solution is: ');
	  res.send(results);
	});
});


// router.get('/add', function(req, res, next) {
	

// 	db.query('SELECT * from pro', function (error, results, fields) {
// 	  if (error) throw error;
// 	  //console.log('The solution is: ');
// 	  res.send(results);
// 	});
// });


router.get('/get', function(req, res, next) {
	
	//console.log(db)
	db.query('SELECT * from contact', function (error, results, fields) {
	  if (error) throw error;
	  //console.log('The solution is: ');
	  res.send(results);
	});
	
});

router.get('/getcl', function(req, res, next) {
	
	console.log(db)
	db.query('SELECT *  from client', function (error, results, fields) { //, contact WHERE organ = Handler AND (SELECT Organisation FROM user) = Handler
	  if (error) throw error;
	  //console.log('The solution is: ');
	  res.send(results);
	});
	
});




router.post('/acc', function(req, res, next) {
	
	var data = req.body
	console.log(data)
	db.query('UPDATE pro SET acc=? WHERE id=?',[data.acc,data.id], function (error, results) {
	  if (error){
		  throw error;
		 res.send('0');
		 return;
	  } 
	  //console.log('The solution is: ');
	  res.send("1");
	});
	
});



router.get('/getuser', function(req, res, next) {
	
	
	var data = req.body
	
	
	db.query('SELECT * from user', function (error, results, fields) {
	  if (error) throw error;
	  //console.log('The solution is: ');
	  res.send(results);
	});
	
	
});


router.post('/adduser', function(req, res, next) {
	
	
	var data = req.body
	
	console.log(data)
	if (data.Admin == true)
	{var IAdmin = 1}
	else
	{var IAdmin = 0}
	var  addSql = 'INSERT INTO `user` (Organisation, Admin, email,password , username, FirstName,LastName) VALUES (?,?, ?, ?, ?, ?, ?)';
	var  addSqlParams = [data.org, IAdmin, data.email, data.password, data.fname, data.fname ,data.lname];
	db.query(addSql,addSqlParams,function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ',err.message);
			 res.send('0');
	         return;
	        }
					
		  console.log(result)
	 
	      res.send('1');
	});
});

router.post('/addc', function(req, res, next) {
	
	
	var data = req.body
	
	
	
	console.log(data)
	var  addSql = 'INSERT INTO contact(Fname, Lname, Email,PhoneNbr,organ,name,password) VALUES ( ?, ?, ?, ?, ?, ?, ?)';
	var  addSqlParams = [data.cfname, data.clname, data.email, data.cnumber ,data.oname , data.name,data.password];
	db.query(addSql,addSqlParams,function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ',err.message);
			 res.send('0');
	         return;
	        }
					
		  console.log(result)
	 
	      res.send('1');
	});
	
});

router.post('/addcl', function(req, res, next) {
	
	
	var data = req.body
	
	
	
	console.log(data)
	var  addSql = 'INSERT INTO client(clientname, Contact, AccountID,ABN,ACN,BAddress,BSBAccountnumber, BSBName, TFN, Type, Handler) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; //need to set this last value to whatever your organisation id is in sql until we set up the system
	var  addSqlParams = [data.clientname, data.contact, data.accountid, data.abn ,data.acn , data.baddress,data.bsbaccountn, data.bsbname, data.tfn, data.type, data.Handler];
	db.query(addSql,addSqlParams,function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ',err.message);
			 res.send('0');
	         return;
	        }
					
		  console.log(result)
	 
	      res.send('1');
	});
	
});
router.post('/addclient', function(req, res, next) {
	
	
	var data = req.body
	
	
	
	console.log(data)
	var  addSql = 'INSERT INTO client(clientname, Contact, AccountID,ABN,ACN,BAddress,BSBAccountnumber, BSBName, TFN, Type, Handler) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; //need to set this last value to whatever your organisation id is in sql until we set up the system
	var  addSqlParams = [data.clientname, data.Contact, data.AccountID, data.ABN ,data.ACN , data.BAddress,data.BSBAccountNumber, data.BSBName, data.TFN, data.Type, data.Handler];
	db.query(addSql,addSqlParams,function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ',err.message);
			 res.send('0');
	         return;
	        }
					
		  console.log(result)
	 
	      res.send('1');
	});
	
});

router.get('/deuser', function(req, res, next) {
	
	console.log(req.query)
	db.query('delete  from user where UserID = ?', [req.query.id],function (error, results, fields) {
	  if (error) console.log("oops");
	  //console.log('The solution is: ');
	  res.send('1');
	});
	
 // res.send('respond with a resource');
});
router.get('/deservo', function(req, res, next) {
	
	console.log(req.query)
	db.query('delete  from service where ID = ?', [req.query.id],function (error, results, fields) {
	  if (error) console.log("oops");
	  //console.log('The solution is: ');
	  res.send('1');
	});
	
 // res.send('respond with a resource');
});
router.get('/determ', function(req, res, next) {
	
	console.log(req.query)
	db.query('delete  from terms where ID = ?', [req.query.id],function (error, results, fields) {
	  if (error) console.log("oops");
	  //console.log('The solution is: ');
	  res.send('1');
	});
	
 // res.send('respond with a resource');
});
router.get('/del', function(req, res, next) {
	
	
	
	console.log(req.query)
	db.query('delete  from pro where id = ?', [req.query.id],function (error, results, fields) {
	  if (error) throw error;
	  //console.log('The solution is: ');
	  res.send('1');
	});
	
 // res.send('respond with a resource');
});
router.get('/OrgName', function(req, res, next) {
	

	
	db.query(' select organisationName from organisation where OrganisationID = ?', [req.query.id],function (error, results, fields) {
		console.log(results)
		if(error){
			console.log('[INSERT ERROR] - ',error.message);
			res.send('0');
			console.log(results)
			return;
		   }
		//console.log('The solution is: ');
		console.log(results)
		res.send(results);
	})
})
router.post('/login', function(req, res, next) {
	
	var data = req.body
	
	db.query(' select  * from user where email = ? and password = ?', [data.email,data.password],function (error, results, fields) {
	  if (error){
		  
		  console.log("oops")
		  res.send('0');
		  return;
	  } 
	  
	  if(results.length==0){
		   
			db.query(' select  * from contact where Email = ? and password = ?', [data.email,data.password],function (error, results, fields) {
				console.log(results)
				if(results.length == 0){
					res.send('0');
				}else{
					res.send(results);
				}
			})
		  
	  }else{
		  
		    res.send(results);
	  }
	  //console.log('The solution is: ');
	
	});
	
 // res.send('respond with a resource');
});


router.get('/udel', function(req, res, next) {
	
	console.log(req.query)
	db.query('DELETE from client WHERE AccountID = ?', [req.query.id],function (error, results, fields) {
	  if (error) console.log("oops");
	  //console.log('The solution is: ');
	  res.send(fields);
		console.log(fields);
	});
 // res.send('respond with a resource');
});



module.exports = router;
