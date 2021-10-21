var express = require('express');
var app = express();

var NodeRSA = require('node-rsa');



var router = express.Router();
var db = require( "../database/db.js" );

var crypto = require('crypto');
const nodemailer = require('nodemailer');


router.post('/customerportal',function(req,res,next){
	console.log(req.body.email)
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
		+'http://localhost:3000/viewproposal/' + token + '\n\n',
	};
	transporter.sendMail(mailOptions, (err, response) => {
		if (err) {
			console.error('there was an error\n' + req.body.email);
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
router.get('/getservowith',function(req,res,next){

	db.query('SELECT * FROM service WHERE ID = ?', [(req.query.id)],function (error, results, fields) {
		if(error){
			console.log('[INSERT ERROR] - ',error.message);
			console.log(req.query.id)
			res.send('0');
			return;
		   }
		   console.log(parseInt(req.query.id))
		   console.log(results)
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
	
	
	
	console.log(data.id)
	db.query('UPDATE service SET DBill = ?, TaxRate = ?, XeroAccount=?, Spay =?, Cpay =?, Rpay =?, Sname = ?, SDesc = ? where ID=?', [data.Dbill,data.TRate,data.xeroData,data.Spay,data.Cpay,data.Rpay,data.Sname,data.SDesc,data.id],function (err, result) {
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
	var addSqlParam = [data.org, data.Dbill,data.TRate,data.xeroData,data.Spay,data.Cpay,data.Rpay,data.Sname,data.SDesc];
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
   var  addSql = 'INSERT INTO pro(name, client,contact, sdate, edate, clen, message, acc, services,userid) VALUES ( ?, ?,?, ?, ?, ?, ?, ?,? ,?)';
   var  addSqlParams = [data.name, data.client,data.contactid, data.sdate, data.edate, data.clen, data.message, data.acc, JSON.stringify(data.serviceSend),data.userid];
   db.query(addSql,addSqlParams,function (err, result) {
           if(err){
            console.log('[INSERT ERROR] - ',err.message);
			console.log(addSql)
			console.log(addSqlParams)
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
// #UPDATE PROPOSAL
router.post('/updatepro', function (req, res, next) {
	
	var data = req.body
	console.log(data.name)
	db.query("UPDATE pro SET name = ?, client = ?,contact = ?, sdate = ?, edate = ?, clen = ?, message = ?, acc = ?, ,contact = ?, services = ? WHERE id = ?",[data.na, data.client,data.contactid, data.sda, data.eda, data.cle, data.mes, data.ac, data.cont, data.serviceSend, data.id],function (err, results) {
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
	  var  addSql = 'INSERT INTO pro(name, client, sdate, edate, clen, message, acc, services, userid) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	  var  addSqlParams = [temp[0].name, temp[0].client, temp[0].sdate, temp[0].edate, temp[0].clen, temp[0].message, temp[0].acc, temp[0].services, temp[0].userid];
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
	db.query('SELECT Email from contact WHERE ContactID = ?', [req.query.id],function (error, results, fields) {
		if (error) throw error;
	  console.log('The solution is: ')
	  res.send(results);
	});
});
router.get('/getcont', function(req, res, next) {
	
	//console.log(db)
	db.query('SELECT Contact from client WHERE AccountID = ?', [req.query.id],function (error, results, fields) {
		if (error) throw error;
	  console.log('The solution is: ')
	  res.send(results);
	});
});
router.get('/viewproposal', function(req, res, next) {
	
	//console.log(token)
	db.query('SELECT * from pro where token = ? AND expiry > ?', [req.query.token, Date.now()],function (error, results, fields) {
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
	db.query('SELECT *  from client where Handler = ?',[req.query.id], function (error, results, fields) {
	  if (error) throw error;
	  //console.log('The solution is: ');
	  res.send(results);
	});
	
});



// #UPDATE PROPOSAL
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
	

	db.query('SELECT * from user where Organisation = ?',[req.query.id], function (error, results, fields) {
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
	var  addSql = 'INSERT INTO user(username,email,password,Admin,Organisation,FirstName,LastName) VALUES ( ?, ?, ?, ?, ?, ?, ?)';
	var  addSqlParams = [data.username, data.email, data.password, 1 ,data.Org , data.FirstName,data.LastName];
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
router.post('/addOrg', function(req, res, next) {
	
	
	var data = req.body
	console.log(data)
	var  addSql = 'INSERT INTO organisation(organisationName) VALUES ( ?)';
	var  addSqlParams = [data.oname];
	db.query(addSql,addSqlParams,function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ',err.message);
			 res.send('0');
	         return;
	        }
					
		  console.log(result)
		// 	db.query('SELECT LAST_INSERT_ID();',function (error,Resulting){
		// 		if(err){
		// 			console.log('[INSERT ERROR] - ',err.message);
		// 			res.send('0');
		// 			return;
		// 		   }
		// 		res.send(Resulting);
		
		// })
		res.send(result)

	});
	
});

router.post('/addcontact', function(req, res, next) {
	
	
	var data = req.body
	
	
	
	console.log(data)
	var  addSql = 'INSERT INTO contact(Fname, Lname, Email,PhoneNbr,Organ,Address) VALUES ( ?, ?, ?, ?, ?, ?)';
	var  addSqlParams = [data.cfname, data.clname, data.email, data.PhoneNbr ,data.org , data.Address];
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
let rsaKey={
	public: '-----BEGIN PUBLIC KEY-----\n' +
	'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ68xlK6vzY23Q6cx/MupFrFXJGea6a9\n' +
	'6qJvrPNF6hZ3jEVWGDr3ZX9OvpQKD+04wcvHsaX2BLXqM+ySQgwZEckCAwEAAQ==\n' +
	'-----END PUBLIC KEY-----',
	private: '-----BEGIN PRIVATE KEY-----\n' +
	'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAnrzGUrq/NjbdDpzH\n' +
	'8y6kWsVckZ5rpr3qom+s80XqFneMRVYYOvdlf06+lAoP7TjBy8expfYEteoz7JJC\n' +
	'DBkRyQIDAQABAkB/3iED01rkGR3I/5Ix2oiadhEzXCHrl2DCqKLw9Ii0vyE9e4uu\n' +
	'vDx07bIWX5nGyXSZJ13wSgc3pmtsiDvGQwOBAiEA4tp3OHKNjJQ2SXwqjVNjA2z/\n' +
	'AerB4R9Cq96oGnZQ/U0CIQCzIeBXuNuJTtLnq5duPfSlVetzNvS2r7AXCKjm7FYY\n' +
	'bQIgUpHN/x/C4b44nDqzikklquOLVflKpFQqgkBC047pH6kCIHbLcoH6X+0RTyDA\n' +
	'VO6RO9shvcFsoqE8peTAo3JxLS+JAiEAlAlr2mkt3WiiZSKhdIzsphANIPZ+78q/\n' +
	'pPR/hDuR2r0=\n' +
	'-----END PRIVATE KEY-----'
}

router.post('/login', function(req, res, next) {
	
	var data = req.body

	db.query(' select  * from user where username = ? and password = ?', [data.username,data.password],function (error, results, fields) {
	  if (error){
		  
		  console.log("oops")
		  res.send('0');
		  return;
	  }
	  
	  if(results.length==0){
		   
			db.query(' select  * from contact where email = ? and password = ?', [data.email,data.password],function (error, results, fields) {
				console.log(results)
				if(results.length == 0){
					res.send('0');
				}else{
					let pubKey = new NodeRSA(rsaKey.public,'pkcs8-public');
					results[0].password = pubKey.encrypt(results[0].password, 'base64');
					res.send(results);
				}
			})
		  
	  }else{
	  	console.log(results)
		  let pubKey = new NodeRSA(rsaKey.public,'pkcs8-public');
		  results[0].password = pubKey.encrypt(results[0].password, 'base64');
		    res.send(results);
	  }
	  //console.log('The solution is: ');
	
	});
	
 // res.send('respond with a resource');
});

router.post('/loginHeart', function(req, res, next) {

	var data = req.body
	priKey = new NodeRSA(rsaKey.private,'pkcs8-private');
	data.password = priKey.decrypt(data.password, 'utf8');
	db.query(' select  * from user where username = ? and password = ?', [data.username,data.password],function (error, results, fields) {
		if (error){
			console.log("oops")
			res.send('0');
			return;
		}

		if(results.length==0){

			db.query(' select  * from contact where email = ? and password = ?', [data.email,data.password],function (error, results, fields) {
				console.log(results)
				if(results.length == 0){
					res.send('0');
				}else{
					let pubKey = new NodeRSA(rsaKey.public,'pkcs8-public');
					results[0].password = pubKey.encrypt(results[0].password, 'base64');
					res.send(results);
				}
			})

		}else{
			console.log(results)
			let pubKey = new NodeRSA(rsaKey.public,'pkcs8-public');
			results[0].password = pubKey.encrypt(results[0].password, 'base64');
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

router.get('/udelcl', function(req, res, next) {
	
	console.log(req.query)
	db.query('delete  from client where AccountID = ?', [req.query.id],function (error, results, fields) {
	  if (error) console.log("oops");
	  //console.log('The solution is: ');
	  res.send('1');
	});
	
 // res.send('respond with a resource');
});


//Reset password
router.post('/respassword', function(req, res, next) {
	
	var data = req.body
	var type = data.atype
	
	if(type == 1){
		
		db.query('UPDATE user SET  password = ? where email = ?', [data.rcpassword,data.remail],function (error, results, fields) {
		  if (error){
			  
			  console.log("oops")
			  res.send('0');
			  return;
		  } 
		  
		     res.send(results);
		  
		 
		
	})
	
	}else{
		
		db.query('UPDATE contact SET  password = ? where Email = ?', [data.rcpassword,data.remail],function (error, results, fields) {
			console.log(results)
			if(results.length == 0){
				res.send('0');
			}else{
				res.send(results);
			}
		})
	}
	
	  //console.log('The solution is: ');
	
	
	
 // res.send('respond with a resource');
});

router.get('/sendEmail', function(req, res, next) {
	
	
	var num="";
	for(var i=0;i<4;i++){
		num+=Math.floor(Math.random()*10)
	}

	
	 nodemailer.createTestAccount((err, account) => {
		 
	        //密钥
	        let transporter = nodemailer.createTransport({
	            host: 'smtp.163.com',
				secure: true, // 
	            port: 465,
	            auth: {
	                user: "wuhuairlinee@163.com", //
	                pass: "FNMYOYSIXJWNVXLD" //
	            }
	        });
	        let mailOptions = {
	            //
	            from: 'wuhuairlinee@163.com',
	            to:  [req.query.email],
	            subject: 'Verification code',
	            text: '',
	            html: '<b>Your verification code is:' + num + '</b>',
	
	        };
	
	        //
	        transporter.sendMail(mailOptions, (error, info) => {
				let fa = true;
	            if (error) {
	                return console.log(error);
					     res.send('{"code":'+0+',"mes":'+num+'}');
						 fa = false;
					
	            }
				if(fa){
					res.send('{"code":'+1+',"mes":'+num+'}');
				}
	        
	        });
	    });

	 // res.send('1')
   
});


module.exports = router;
