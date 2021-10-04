var express = require('express');
const nodemailer = require('nodemailer');
var app = express();




var router = express.Router();
var db = require( "../database/db.js" );



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
router.post('/applyservo', function(req, res, next) {
	var data = req.body
	
	
	
	console.log(data)
	db.query('UPDATE service SET DBill = ?, TaxRate = ?, XeroAccount=?, StandardPrice =? where Organisation=?', [data.Dbill,data.TRate,data.Xero,data.SPrice,data.org],function (err, result) {
	        if(err){
	         console.log('[INSERT ERROR] - ',err.message);
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
	db.query('SELECT *  from client INNER JOIN contact ON Handler = organ', function (error, results, fields) {
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
	var  addSql = 'INSERT INTO client(clientname, Contact, AccountID,ABN,ACN,BAddress,BSBAccountnumber, BSBName, TFN, Type, Handler) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)'; //need to set this last value to whatever your organisation id is in sql until we set up the system
	var  addSqlParams = [data.clientname, data.contact, data.accountid, data.abn ,data.acn , data.baddress,data.bsbaccountn, data.bsbname, data.tfn, data.type];
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
	db.query('delete  from contact where ContactID = ?', [req.query.id],function (error, results, fields) {
	  if (error) console.log("oops");
	  //console.log('The solution is: ');
	  res.send('1');
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


//重置密码
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
