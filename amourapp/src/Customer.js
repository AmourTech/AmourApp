import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import ReactFileReader from 'react-file-reader';
import {Elements} from "@stripe/react-stripe-js"
import { Nav, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Modal from 'react-bootstrap/Modal'
import axios from 'axios'; 
import data from './Comm';
import { CSVLink} from "react-csv";
import {readString, CSVReader} from 'react-papaparse';
import{ init, send } from 'emailjs-com';
import crypto from 'crypto';
import StripeContainer from './StripeContainer';
import internal from 'stream';

//init("user_rWil2YAmTwqksmYOlnout");

const nodemailer = require('nodemailer');
const buttonRef = React.createRef();
class App extends React.Component{


	 constructor(props) {
	    super(props);
	    this.state = {
			holder:JSON,
			accounts:JSON,
			backlog:0,
			payments:[],
				Spay:0,
				Cpay:0,
				Rpay:0,
				TaxRate:[],
				DBill:[],
				Sname:[],
				Sdate:Date,
				Edate:Date,
			   st :1,
			   Services:JSON,
			   viewdata:[],
			   viewdata1:[],
			   viewdata2:[],
			    clients:[],
			   name:"", 
			  client:"", 
			  contact:"12 Month...",
			  sdate:"", 
			  followdate:"",
			  edate:"", 
			  clen:"12 Month", 
			  message:"", 
			  acc:"0", 
			  pay1:"Weekly...", 
			  pay2:"On Acceptance...",
			  show:false,
			  show1:false,
				show2:false,
			  mes:"",
				na:"", 
				sda:"",
				eda:"",
				py1: "",
				py2:"", 
				cont:"",
				cle:"", 
				ac:"", 
			  userid:'',
				id:'',
			  importer:[{}],
			  showItem:false,
			};
			
			this.sub = this.sub.bind(this);
			this.setShow = this.setShow.bind(this);
			this.setShow1 = this.setShow1.bind(this);
			this.setShow2 = this.setShow2.bind(this);
			this.setMenu = this.setMenu.bind(this);
			this.delete = this.delete.bind(this);
			this.duplicate = this.duplicate.bind(this);
			this.handleOnFileLoad = this.handleOnFileLoad.bind(this);
			this.handleOnRemoveFile = this.handleOnRemoveFile.bind(this);
			this.handleconfirm = this.handleconfirm.bind(this);
			this.getServices = this.getServices.bind(this);
	  }

 componentDidMount() {
      //console.log(this.props.match.params.token);
 this.getList();

	   }
	   handleOpenDialog = (e) => {
		if (buttonRef.current) {
		  buttonRef.current.open(e);
		}
	  };
	   handleOnFileLoad = (data) => {
		console.log('-----onfileload----------------');
		this.setState({importer: data})
		console.log(data)
		console.log('---------------------------');
	  };
	  handleRemoveFile = (e) => {
		// Note that the ref is set async, so it might be null at some point
		if (buttonRef.current) {
		  buttonRef.current.removeFile(e);
		}
	  };
	  handleOnError = (err, file, inputElem, reason) => {
		console.log('-----------onerror---------');
		console.log(err);
		console.log('---------------------------');
	  };
	
	  handleOnRemoveFile = (data) => {
		console.log('-------onremove-------------');
		this.setState({importer: data})
		console.log('---------------------------');
	  };
	  handleconfirm(){
		  //confirm1
		var csv = this.state.importer
		csv.forEach(csv => (
			this.addnoalert(csv.data)
		))
		window.confirm('import confirmed')
		console.log(csv.length)
	  }
async checkcosts(){

	var a = this.state.holder
	this.setState({Spay:0,Cpay:0,Rpay:0})
	
a.forEach( (item, index)=>{
		item.then(res =>{
			this.setState({Spay:this.state.Spay+res.Spay,Cpay:this.state.Cpay+res.Cpay,Rpay:this.state.Rpay+res.Rpay})
			if(index===a.length-1){

				var backpay = this.state.backlog*this.state.Rpay
				this.setState({Spay: this.state.Spay+backpay})
				console.log("this is the backpay"+backpay)
			}
		
			
	}
	)})
var bp;
var sp;
var cp;
var rp;
var bsb
var monies
var temp;
monies = a.map( (item, index)=>{
		temp =item.then(res =>{
				
				rp = res.Rpay;
				cp = res.Cpay;
				bp = res.Rpay*this.state.backlog
				sp =  res.Spay+bp
				bsb = JSON.parse(res.XeroAccount).accountID

				var ap={bsb,cp,bp,rp,sp}

				return ap;
		
			
	}

	
	).catch()
	return temp
	}
);



}

createitem(){
	var apple
	
	
	
	}
getbackpay(){
	var backpay = this.state.backlog*this.state.Rpay
	this.setState({Spay: this.state.Spay+backpay})
	
	console.log(backpay)



}
async getTime(){
	var date = new Date()
	var Cday = date.getDate()
	var Cmonth = date.getMonth()
	var Cyear = date.getFullYear()
	console.log( this.state.viewdata[0])
	var Sdate = this.state.viewdata[0].sdate
	var Edate = this.state.viewdata[0].edate
	Sdate = Sdate.replace(/-/g,', ').replace(/T.*$/g,'')
	Edate = Edate.replace(/-/g,', ').replace(/T.*$/g,'')
	var Sdate = new Date(Sdate)
	var Edate = new Date(Edate)
	console.log(Cday)
	console.log(Sdate.getDate())
	var mDiff = Cmonth-Sdate.getMonth()
	var dDiff = Cday-Sdate.getDate()
	console.log(dDiff)
	console.log(Sdate.getMonth())
	var backlog = 0;
	if(	( mDiff === 0)
		|| (	( mDiff ===1)&&(dDiff <0) ) )
			{console.log("No backlog")}
		else {
			if(	( mDiff >1)&&(dDiff >=0) )
				{backlog = mDiff+1;console.log("dDiff")	}
			else{backlog = mDiff}
			
			{console.log("backlog of:"+backlog+" months")}
		}

	await this.setState({Sdate:Sdate.toDateString(), Edate:Edate.toDateString(), backlog:backlog})
	

	
}
async getstuff(){
	var mony
	await	this.getServices().then(()=>{
			return this.getTime().then(()=>{

				this.checkcosts().then(res=>mony=res)


}).catch()

}).catch()
console.log(mony)
}

async	  getServices(){
		var services = JSON.parse(JSON.parse(this.state.viewdata[0].services))

		console.log(services[0])
		
	let a = services.map((item)=>{
	return parseInt(item.id)
	})


	

let b = 	a.map((item, index)=>
	axios.get(this.$url+'/users/getservowith?id='+item)
		.then( res=> {
			return res.data[0]
			
	}
	
			)

			
	)

	//how to access promisdata
	// b.map((item, index) => { 
	// 	item.then(res=>console.log(res))


	// } )
	this.setState({holder:(b)})
}


	getClient(){
			 
			 axios.get(this.$url+'/users/get',null)
			   .then(res => {
			 		
			 	   this.setState({clients: res.data});		 
			 	   console.log(res.data)
			    
			   })
			   
			   .catch(err => {
			      console.log(err);
			   })
			 
	}
 secret = async () => {
		try{
			var data = this.state
			const resp = await axios.post(this.$url+"/payments/secret",data)
		 }
		catch (err) {

			console.error(err);
		}
	 
	 }

	 getAccounts(){






	 }


   
    getList(){

	 
		axios.get(this.$url+"/users/viewproposal", { params: {
      token: this.props.match.params.token
      //token: "95307ce8ffcaa535a364a83db42361fb3cfdfb61"

    },
  })
		  .then(async res => { 
				
				await  this.setState({viewdata: res.data});		 
			  // this.state.viewdata =  res.data
			   console.log(res.data)
			   await this.getstuff();
					
			   this.getbackpay()
		   
			   this.getAccounts()
		  })
		  .catch(err => {
		     console.log(err);
		  })
	
		}
	

	
	delete(id){
		
		if (window.confirm("confirm delete?")) {
		  axios.get(this.$url+'/users/del?id='+id,null)
		    .then(res => {
		  		
		  		//this.setState({viewdata: res.data});		 
		  	  // this.state.viewdata =  res.data
		  	   console.log(res.data)
		  			
		  	   this.getList();
		     
		    })
		    .catch(err => {
		       console.log(err);
		    })
		} else {
			return 
		 
		}
		
		
	}

	update(){
		 
		var data  = this.state

		axios.post(this.$url+'/users/answerpro',data)
			.then(res => {
					 
					 
					 if(res.data==1){
						 
						 //this.setShow(false)
						 
					 }else{
						 
						 
					 }
					 
			 
			})
			.catch(err => {
				 console.log(err);
			})
		
}

	duplicate(id){
		if (window.confirm("confirm duplicate?")) {
		  axios.get(this.$url+'/users/findprop?id='+id,null)
		    .then(res => {
		  		//this.setState({viewdata: res.data});		 
		  	  // this.state.viewdata =  res.data
		  	   console.log(res.data)
		  			
		  	   this.getList();
		     
		    })
		    .catch(err => {
		       console.log(err);
		    })
		} else {
			return 
		 
		}
	}
	addnoalert(data){
		axios.post(this.$url+'/users/add',data)
		.then(res => {
						 
						 
			if(res.data==1){
				
			   this.getList();
				
			}else{
				
				
			}
			
	
	})
}
duplicateadd(data){
	axios.post(this.$url+'/users/add',data)
	.then(res => {
					 
					 
		if(res.data==1){
			
			alert("Successful operation!")
			
		   this.getList();
			
		}else{
			
			
		}
		

})
		
	}
	
	setMenu(num){
		  this.getClient();
		   this.getList();
		  this.setState({st: num});
	}
	
	setShow(flag){
		 
		  this.setState({show: flag});
	}
	
	setShow1(flag,mes){
		 
		  this.setState({show1: flag,mes:mes});
	}

	setShow2(flag,mes, na, sda, eda, py1, py2, cont, cle, ac, id){
		 
		this.setState({show1: flag,na:na, mes:mes, sda:sda, eda:eda, py1:py1, py2:py2, cont:cont, cle:cle, ac:ac, id:id});
}
	
	acc(id,value){
		
		let data= {
			id:id,
			acc:value
		}
		if (window.confirm("confirm "+ value +"?")) {
		axios.post(this.$url+'/users/acc',data)
		  .then(res => {
						 
						 
						 if(res.data==1){
							 
							 alert("Successful operation!")
							 
							this.getList();
							 
						 }else{
							 
							 
						 }
						 
		   
		  })
		  .catch(err => {
		     console.log(err);
		  })
		
		}else{
			
		}
	}
	 sub(){
		 
		 console.log(localStorage.getItem("user"))
		 let view  = JSON.parse(localStorage.getItem("user"))[0]
		 this.state.userid = view.UserID
		 var data  = this.state
		
		 data['userid'] = view.UserID
		   axios.post(this.$url+'/users/add',data)
		     .then(res => {
				 
				 
				 if(res.data==1){
					 
					 alert("Proposal sent successfully!")
					 
					 this.setShow(false)
					 
				 }else{
					 
					 
				 }
				 
		      
		     })
		     .catch(err => {
		        console.log(err);
		     })
		
		
		console.log(this.state)
		
	}
	  render() {
		let admin  = 0
         
           const isisd = this.state.st;
		   let view;


		    if (isisd == 1) {
			 
			  view=
			 <>
			 <table className="table">
			 
			 <tr className="table-tr">
			   <td>Proposal Name</td>
			   <td>Client</td>
			   <td>Contact</td>
				<td>Start Date</td>
				<td>Start Date</td>
				<td>Minimun Contract Length</td>
				<td>Initial Payment</td>
				<td>Recurring Billing</td>
				<td>Payment on Completion</td>
				<td>Proposal status</td>
				<td>operate</td>
			 </tr>
			 
			{
			                   this.state.viewdata.map((item, index) => {
			                       return <tr>
								   <td >{item.name}</td>
								   <td >{item.client}</td>
								   <td >{item.contact}</td>
								   <td >{this.state.Sdate}</td>
								   <td >{this.state.Edate}</td>
								   <td >{item.clen}</td>
								   <td >${this.state.Spay}</td>
								   <td >${this.state.Rpay}</td>
								   <td >${this.state.Cpay}</td>
								   <td >{item.acc == 0 ?  'Pending' : item.acc}</td>
								   <td ><a onClick={() => this.setShow2(true,item.message, item.name, item.sdate, item.edate, item.pay1, item.pay2, 
										item.contact, item.clen, item.acc, item.id)} href="javascript:;" >Accept or Refuse</a>
									</td>
										
										
		
								   </tr>
			                   })
			               }
			
			 </table> </>;
		   }
		   
  
		   const csvReport = {
			filename: 'Report.csv',
			data: this.state.viewdata
		}
  


 
  return (
		<>


      
	
	<div className="App">
		
	  <header className="App-header1">
	   
		<div className="body">
	


		{view}
		{}

  
		<Modal show={this.state.show1} fullscreen={false} onHide={() => this.setShow1(false,'')}>
		  <Modal.Header closeButton>
		    <Modal.Title>Accept or refuse proposal</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
						<Form>
								  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Status</Form.Label>
              <Form.Select value={this.state.ac}
			          onChange={e => this.setState({ ac: e.target.value })}  defaultValue="Choose...">
			       		<option value="Accept">Accept</option>
			 	  			<option value="Refuse">Refuse</option>
			        </Form.Select>
							</Form.Group>
							<Button className="me-2" onClick={() => this.update()}>
					    Update
					  
					  </Button>
						</Form>
						
					</Modal.Body>
		</Modal>
		{this.state.showItem ? <StripeContainer/> : <> <h3>
			<br/>
			This is the Start Date {this.state.Sdate}<br/>
			this is the End Date {this.state.Edate}<br/>
			
			
			
			
			This Much on Startup: ${this.state.Spay}<br/>
			This Much Monthly: ${this.state.Rpay}<br/>
			This Much on Completion: ${this.state.Cpay}</h3>
			<button onClick={() => this.setState({showItem:true})}>Purchase</button></>}
		<button onClick = {()=> this.getstuff()}>Check Cost</button>			
		</div>
	  </header>
	</div>

		</>
		
  )};

 
  
}

export default App
