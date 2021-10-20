import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

import { Nav, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Home from './Home'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
var url = require('url')


require('dotenv').config()

//add terms and conditions that are customisable
var servicecheck =0;


class App extends React.Component{
	
	constructor(props) {
	   super(props);
	   let organ  = (JSON.parse(localStorage.getItem("user"))[0])
	   this.state = {
		   			//test org
					   accounts:JSON,
		   		  org :organ.Organisation,
				  Admin: false,
					show:false,
					show2:false,
					show3:false,
					show4:false,
					xeroData:JSON,
					optionItems:JSON,
		          st :1,
				  email:'',
				  fname:'',
				  lname:'',
				  password:'',
				  viewdata:[],
				  ServiceData:[],
					TermData:[],
				message:'',
				Sname:'',
				SDesc:'',
				Spay:'',
				Rpay:'',
				Cpay:'',
				Begin:false,
				During:false,
				End:false,

				ProposalID:'',
				ServiceID:'',
				Service:{},




				TName:'',
				TDesc:'',
				Terms:'',
				Tid:'',
				  Dbill:'',
				  TRate:'',
				  Xero:'',
				  id:''
				};

		this.handleAdmin = this.handleAdmin.bind(this);
		this.adduser = this.adduser.bind(this);
		this.getuser =   this.getuser.bind(this);
		this.delete = this.delete.bind(this);
		this.Sdelete = this.Sdelete.bind(this);
		this.Tdelete = this.Tdelete.bind(this);
		this.applyService = this.applyService.bind(this);
		this.updateService = this.updateService.bind(this);
		this.updateTerm = this.updateTerm.bind(this);
		this.applyTerm = this.applyTerm.bind(this);
		this.getService = this.getService.bind(this);
		this.getTerm = this.getTerm.bind(this);
		this.setShow = this.setShow.bind(this);
		this.setShow2 = this.setShow2.bind(this);
		this.setShow3 = this.setShow3.bind(this);
		this.setShow4 = this.setShow4.bind(this);
		this.BillHandler = this.BillHandler.bind(this);
		this.storeData = this.storeData.bind(this);
		this.account = this.account.bind(this);

	 }


	 componentDidMount() {
		this.getService()
		this.getTerm()

		this.storeData()
		
	 }

	 BillHandler(DBill){
		 this.setState({Dbill:DBill})
		if (DBill==="End"){
			this.setState({Spay:0})
			this.setState({Rpay:0})
			this.setState({During:false})
			this.setState({Begin:false})
			this.setState({End:true})
		}else if(DBill==="Begin"){
			this.setState({Cpay:0})
			this.setState({Rpay:0})
			this.setState({During:false})
			this.setState({Begin:true})
			this.setState({End:false})
		}else if(DBill==="During"){
			this.setState({Spay:0})
			this.setState({Cpay:0})
			this.setState({During:true})
			this.setState({Begin:false})
			this.setState({End:false})
		}else if(DBill==="Mixed"){
			this.setState({During:true})
			this.setState({Begin:true})
			this.setState({End:true})
		}
		console.log(this.state.Dbill)
		console.log(this.state.During)
		console.log(this.state.Begin)
		console.log(this.state.End)



	 }
	 Org(){
		axios.get(this.$url+'/xero/organisation',null).then(res=>{

			console.log(res.data)
				})

	 }
	 async account(){
		await axios.get(this.$url+'/xero/accounts',null).then(res=>{

			this.setState({accounts:(res.data.body.accounts)})
				})
				console.log("Accounts")
				console.log(this.state.accounts)
				this.state.accounts.map((item, index) => {
				return console.log(item)
				})
				let optionsItems = this.state.accounts.map((item, index) => 
				<option value= {index} label= {item.name}></option>
	)	
	await this.setState({optionItems:optionsItems})
				

	




	 }
	 storeData(){
		 
		//axios.get(this.$url+'/xero/retrieve?id='+this.state.org,null)
		//.then(res=>{

			if (window.location.search.length!==0){
				axios.get(this.$url+'/xero/callback'+window.location.search,null)

				.then(res =>{
					
					console.log(res.data)
					axios.post(this.$url+'/xero/storeToken?id='+this.state.org,null)
				}
					)
			}
		}
		//)			
	//	}

	
		

	 
	 getService(){
		var id = this.state.org
		axios.get(this.$url+'/users/getservo?id='+id,null)
		.then(res=>{
					var item = (res.data)
					console.log(item)		 
					this.setState({ServiceData:res.data})
		})
		.catch(err => {
			console.log(err);
		 })


	 }
	 getTerm(){
		var id = this.state.org
		axios.get(this.$url+'/users/getterm?id='+id,null)
		.then(res=>{
					var item = (res.data)
					console.log(item)		 
					this.setState({TermData:res.data})
		})
		.catch(err => {
			console.log(err);
		 })


	 }

async	applyService(){
		 if(window.confirm("confirm apply"))
	await this.setState({xeroData:JSON.stringify(this.state.accounts[this.state.ServiceID])})
		 console.log(this.state.xeroData)
		var data= this.state
		axios.post(this.$url+'/users/addservo',data)
		.then(res=>{
			if(res.data===1){
			alert("Applied Settings Succesfuly!")

			
		}else{
			 alert("failed")
		   
		}
	})
	this.getService();

}
applyTerm(){
	if(window.confirm("confirm apply"))
   var data= this.state
   axios.post(this.$url+'/users/addterm',data)
   .then(res=>{
	   if(res.data===1){
	   alert("Applied Settings Succesfuly!")

	   
   }else{
		alert("failed")
	  
   }
})
this.getTerm();

}
	updateService(){
		if(window.confirm("confirm update"))
	   var data= this.state
	   axios.post(this.$url+'/users/updateservo',data)
	   .then(res=>{
		   if(res.data===1){
		   alert("Applied Settings Succesfuly!")

		   
	   }else{
			alert("failed")
		  
	   }
   })
	this.getService();

	 }
	 updateTerm(){
		if(window.confirm("confirm update"))
	   var data= this.state
	   axios.post(this.$url+'/users/updateterm',data)
	   .then(res=>{
		   if(res.data===1){
		   alert("Applied Settings Succesfuly!")

		   
	   }else{
			alert("failed")
		  
	   }
   })
	this.getTerm();

	 }

	 setMenu(num){
		  this.getuser()
	 	  this.setState({st: num});
			
	 }
	setShow2(flag, Sname, SDesc, Spay, Rpay, Cpay, Dbill, TRate, Xero,id){
		 
		 this.setState({show2: flag, Sname:Sname, SDesc:SDesc, Spay:Spay, Rpay:Rpay, Cpay:Cpay, Dbill:Dbill, TRate:TRate, Xero:Xero, id:id});
		 this.BillHandler(Dbill)
	 }
	 setShow3(flag, TName, TDesc, Terms, Tid){
		 
		this.setState({show3: flag, TName:TName, TDesc:TDesc,Terms:Terms,Tid:Tid});
	}
	 async setShow(flag){
		if(flag===true){
		await this.account()}

		this.setState({show: flag	})
		this.BillHandler(this.state.Dbill)
	 }
	 setShow4(flag){
		 
		this.setState({show4: flag	})
	 }

	 getuser(){
		 
		axios.get(this.$url+'/users/getuser?id='+this.state.org,null)
		
		
		
			  .then(res => {
								 
				 this.setState({viewdata:res.data})
											  
				
				
			  })
			  .catch(err => {
				 console.log(err);
			  })
		}	 
	 delete(id){
	 	
	 	if (window.confirm("confirm delete?")) {
	 	  axios.get(this.$url+'/users/deuser?id='+id,null)
	 	    .then(res => {
	 	  		
	 	  		//this.setState({viewdata: res.data});		 
	 	  	  // this.state.viewdata =  res.data
	 	  	   console.log(res.data)
	 	  			
	 	  	   this.getuser();
	 	     
	 	    })
	 	    .catch(err => {
	 	       console.log(err);
	 	    })
	 	} else {
	 		return 
	 	 
	 	}
	 	
	 	
	 }
	 Sdelete(id){
	 	
		if (window.confirm("confirm delete?")) {
		  axios.get(this.$url+'/users/deservo?id='+id,null)
			.then(res => {
				  
				  //this.setState({viewdata: res.data});		 
				// this.state.viewdata =  res.data
				 console.log(res.data)
					  
				 this.getService();
			 
			})
			.catch(err => {
			   console.log(err);
			})
		} else {
			return 
		 
		}
		
		
	}
	Tdelete(id){
	 	
		if (window.confirm("confirm delete?")) {
		  axios.get(this.$url+'/users/determ?id='+id,null)
			.then(res => {
				  
				  //this.setState({viewdata: res.data});		 
				// this.state.viewdata =  res.data
				 console.log(res.data)
					  
				 this.getService();
			 
			})
			.catch(err => {
			   console.log(err);
			})
		} else {
			return 
		 
		}
		
		
	}
	 
	 handleAdmin (event) {
			const name = event.target.name;
			const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
			this.setState({
				[name]: value
			})
	 }
	 
	 authenticate(){
		 axios.get(this.$url+'/xero/connect',null)
		.then(res => {
			
				  

			window.location.href=res.data;

	   
	  })
	  .catch(err => {
		 console.log(err);
	  })
			




		
		  }	 
	 

	 
	 adduser(){
		 
		 var data  = this.state 
		 axios.post(this.$url+'/users/adduser',data)
		   .then(res => {
		 		 				 				 
			 if(res.data===1){
				 alert("Create  User successfully!")
				 
			 }else{
				  alert(" Creation failed")
				
			 }
		 		 				 
		    
		   })
		   .catch(err => {
		      console.log(err);
		   })
	 }


		
					   	
 render() {	

		
	
				 
			   
		    
	let admin  = JSON.parse(localStorage.getItem("admin"))[0]
	 if(admin === 0){
		return (  <div className="App">
      <header className="App-header">
        <p>
          Settings
        </p>
      </header>
    </div>)
	 }
	 if(servicecheck === 0 ){
		this.getService();
		servicecheck=1;
	}

	 const isisd = this.state.st;
	 let view;
	 let serviceDropbox;

	 if (isisd === 1) {
		 
		 view = <> <Form>

		 <Row className="mb-3">
		 
		
			<Form.Group md="3"  as={Col} controlId="formGridAddress1">
			   <Form.Label>First Name</Form.Label>
			   <Form.Control  type="text" value={this.state.fname}
					onChange={e => this.setState({ fname: e.target.value })}   />
				</Form.Group>
					
			<Form.Group md="3"  as={Col} controlId="formGridAddress1">
			  <Form.Label>Last Name</Form.Label>
			  <Form.Control  type="text" value={this.state.lname}
				   onChange={e => this.setState({ lname: e.target.value })}   />
			</Form.Group>
			
		 </Row>
		 
		 
		
		 
		  <Row className="mb-3">
		  
		  
		  <Form.Group md="3"  as={Col} controlId="formGridAddress1">
		    <Form.Label>Email</Form.Label>
		    <Form.Control  type="text" value={this.state.email}
		         onChange={e => this.setState({ email: e.target.value })}   />
		  </Form.Group>
		  
		  <Form.Group md="3"  as={Col} controlId="formGridAddress1">
		    <Form.Label>Password</Form.Label>
		    <Form.Control  type="text" value={this.state.password}
		         onChange={e => this.setState({ password: e.target.value })}   />
		  </Form.Group>
		
		 </Row>
		<Row>
		<Form.Group md="3"  as={Col} controlId="formBasicCheckbox">
		<Form.Check type="checkbox" name="Admin" label="admin" checked={this.state.Admin} onChange={this.handleAdmin}/>
		</Form.Group>
		
		
		</Row>
	 
	   </Form>
           <Button onClick={() => this.adduser()} className="me-2" >
             add user
           
           </Button>
		  </>	


	 }else{


		 view=
		  <>
		  <table className="table">
		  
		  <tr className="table-tr">
		    <td>email</td>
		    <td>username</td>
		    <td>password</td>
			<td>create time</td>
		 			
		  </tr>
		  
		 {
		 				this.state.viewdata.map((item, index) => {
		 					return <tr>
		 				   <td >{item.email}</td>
		 				   <td >{item.username} {item.Lname}</td>
		 				   <td >{item.password}</td>
						   <td >{item.create_time}</td>
		 					<td ><a href="javascript:;" onClick={() => this.delete(item.UserID)}>delete</a></td>
		 				   
		 				   </tr>
		 				})
		   }
		 
		  </table> </>;
		 
		 
		 
	 }

  return (
  
  <>
  <div className="App">

	  
    <header className="App-header1">
    
  	<div className="body">

	<header><font size="12">Services</font></header>
		  <>
		  <table className="table">
		  
		  <tr className="table-tr">
		    <td>Service Name</td>
		    <td>Service Description</td>
		    <td>Sign on pay</td>
			<td>Completion Pay</td>
			<td>Monthly Pay</td>
			<td>Tax Rate</td>
			<td>Xero Account</td>
			<td>Edit?</td>
			<td>Delete?</td>
		 			
		  </tr>
		  
		 {
		 				this.state.ServiceData.map((item, index) => {
		 					return <tr>
		 				   <td >{item.Sname}</td>
		 				   <td >{item.SDesc}</td>
		 				   <td >{item.Spay}</td>
		 				   <td >{item.Cpay}</td>
						   <td >{item.Rpay}</td>
						   <td >{item.TaxRate}</td>
						   <td >{JSON.parse(item.XeroAccount).name}</td>
						   <td ><a href="javascript:;" onClick={() => this.setShow2(true,item.Sname,item.SDesc,item.Spay,item.Rpay,item.Cpay,item.DBill,item.TaxRate,item.Xero,item.ID)}>Edit</a></td>
						   <td ><a href="javascript:;" onClick={() => this.Sdelete(item.ID)}>Delete</a></td>


							</tr>
		 				})
		   }
		 
		  </table> </>
		 <Button onClick={() => this.setShow(true)} className="me-2" >
             Add Service
           
           </Button>
		<br></br>
		<br></br>
		<Button onClick={() => this.account()} className="me-2" >
             Org
           
           </Button>


		   	

	
	
	<Nav fill variant="tabs" defaultActiveKey="link-1">
	  <Nav.Item>
	    <Nav.Link  onClick={() => this.setMenu(1)} eventKey="link-1" >Create user</Nav.Link>
	  </Nav.Item>
	  <Nav.Item>
	    <Nav.Link onClick={() => this.setMenu(2)}  eventKey="link-2">View user</Nav.Link>
	  </Nav.Item>
	
	</Nav>
	
	
	{view}
	
		   <Button onClick={()=> this.authenticate()}>		   Add Xero Account
</Button>


	<Modal show={this.state.show} fullscreen={true} onHide={() => this.setShow(false,'')}>
		  <Modal.Header closeButton>
		    <Modal.Title>Add Service</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
						<Form>
						<Form.Label>Add Service Information</Form.Label>
								  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							
							
							<Form.Label>Service Name</Form.Label>
							<Form.Control value={this.state.Sname}
		          onChange={e => this.setState({ Sname: e.target.value })} type="text" placeholder="" />
							<Form.Label>Service Description</Form.Label>
							<Form.Control value={this.state.SDesc}
		          onChange={e => this.setState({ SDesc: e.target.value })} type="text" placeholder="" />
							<Form.Label>Payment Type</Form.Label>
							<Form.Select value={this.state.Dbill}
			          onChange={e =>this.BillHandler(e.target.value) }  defaultValue="default">
					<option value="default" hidden> Choose...</option>
					<option value="Begin">On Sign</option>
					<option value="During">Recuring</option>
					<option value="End">On Completion</option>
					<option value="Mixed">Mixed</option>
			     </Form.Select>
				 			{this.state.Begin && <Form.Group>
							 <Form.Label>Payment On Signing</Form.Label>
							<Form.Control value={this.state.Spay}
		          onChange={e => this.setState({ Spay: e.target.value })} type="text" placeholder="" />
							 </Form.Group>}
				 			{this.state.End && <Form.Group>
							 <Form.Label>Payment On Completion</Form.Label>
							<Form.Control value={this.state.Cpay}
		          onChange={e => this.setState({ Cpay: e.target.value })} type="text" placeholder="" />
							 </Form.Group>}
							 {this.state.During && <Form.Group>
							 <Form.Label>Monthly Payemnts</Form.Label>
							<Form.Control value={this.state.Rpay}
		          onChange={e => this.setState({ Rpay: e.target.value })} type="text" placeholder="" />
							 </Form.Group>}
							
							<Form.Group md="2"  as={Col} controlId="formGridAddress1">
								<Form.Label>Tax Rate</Form.Label>
								<Form.Select  value={this.state.TRate}
										onChange={e => this.setState({ TRate: e.target.value })}   >
										<option value="default" hidden> Choose...</option>	
										<option value="10">10% GST</option>
										<option value="0">0%</option>
										</Form.Select>
								</Form.Group>	
								<Form.Group md="2"  as={Col} controlId="formGridAddress1">
								   <Form.Label>Xero Account</Form.Label>
								   <Form.Select  value={this.state.ServiceID}
										   onChange={e => this.setState({ ServiceID: e.target.value })}   >
											{this.state.optionItems}
				</Form.Select>
					   
					   </Form.Group>
					   </Form.Group>
							<Button className="me-2" onClick={() => this.applyService()}>
					    Add
					  
					  </Button>
						</Form>
						
					</Modal.Body>
		</Modal>
		<Modal show={this.state.show2} fullscreen={true} onHide={() => this.setShow2(false,'')}>
		  <Modal.Header closeButton>
		    <Modal.Title>Update Service</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
						<Form>
						<Form.Label>Update Service Information</Form.Label>
								  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							
							
							<Form.Label>Service Name</Form.Label>
							<Form.Control value={this.state.Sname}
		          onChange={e => this.setState({ Sname: e.target.value })} type="text" placeholder="" />
							<Form.Label>Service Description</Form.Label>
							<Form.Control value={this.state.SDesc}
		          onChange={e => this.setState({ SDesc: e.target.value })} type="text" placeholder="" />
							<Form.Label>Payment Type</Form.Label>
							
							<Form.Select value={this.state.Dbill}
			          onChange={e =>this.BillHandler(e.target.value) }>
					<option value="Begin">On Sign</option>
					<option value="During">Recuring</option>
					<option value="End">On Completion</option>
					<option value="Mixed">Mixed</option>
			     </Form.Select>
				 			{this.state.Begin && <Form.Group>
							 <Form.Label>Payment On Signing</Form.Label>
							<Form.Control value={this.state.Spay}
		          onChange={e => this.setState({ Spay: e.target.value })} type="text" placeholder="" />
							 </Form.Group>}
				 			{this.state.End && <Form.Group>
							 <Form.Label>Payment On Completion</Form.Label>
							<Form.Control value={this.state.Cpay}
		          onChange={e => this.setState({ Cpay: e.target.value })} type="text" placeholder="" />
							 </Form.Group>}
							 {this.state.During && <Form.Group>
							 <Form.Label>Monthly Payemnts</Form.Label>
							<Form.Control value={this.state.Rpay}
		          onChange={e => this.setState({ Rpay: e.target.value })} type="text" placeholder="" />
							 </Form.Group>}
							
							<Form.Group md="2"  as={Col} controlId="formGridAddress1">
								<Form.Label>Tax Rate</Form.Label>
								<Form.Select  value={this.state.TRate}
										onChange={e => this.setState({ TRate: e.target.value })}   >
										<option value="default" hidden> Choose...</option>	
										<option value="10">10% GST</option>
										<option value="0">0%</option>
										</Form.Select>
								</Form.Group>	
							<Form.Label>Xero</Form.Label>
							<Form.Control value={this.state.Xero}
		          onChange={e => this.setState({ Xero: e.target.value })} type="text" placeholder="" />
						</Form.Group>
							<Button className="me-2" onClick={() => this.updateService()}>
					    Update
					  
					  </Button>
						</Form>
						
					</Modal.Body>
		</Modal>
		<Modal show={this.state.show3} fullscreen={true} onHide={() => this.setShow3(false,'')}>
		  <Modal.Header closeButton>
		    <Modal.Title>Update Service</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
						<Form>
						<Form.Label>Update Service Information</Form.Label>
								  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							
							
							<Form.Label>Term Name</Form.Label>
							<Form.Control value={this.state.TName}
		          onChange={e => this.setState({ TName: e.target.value })} type="text" placeholder="" />
							<Form.Label>Term Description</Form.Label>
							<Form.Control value={this.state.TDesc}
		          onChange={e => this.setState({ TDesc: e.target.value })} type="text" placeholder="" />
	<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">


<Form.Label>Terms and Conditions</Form.Label>
<Form.Control value={this.state.Terms}
onChange={e => this.setState({ Terms: e.target.value })} as="textarea" rows={10} />
</Form.Group>
						</Form.Group>
							<Button className="me-2" onClick={() => this.updateTerm()}>
					    Update
					  
					  </Button>
						</Form>
						
					</Modal.Body>
		</Modal>




		<Modal show={this.state.show4} fullscreen={true} onHide={() => this.setShow4(false)}>
		  <Modal.Header closeButton>
		    <Modal.Title>Add new Terms And Conditions</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
						<Form>
						<Form.Label>Add new Terms And Conditions</Form.Label>
								  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							
							
							<Form.Label>Term Name</Form.Label>
							<Form.Control value={this.state.TName}
		          onChange={e => this.setState({ TName: e.target.value })} type="text" placeholder="" />
							<Form.Label>Term Description</Form.Label>
							<Form.Control value={this.state.TDesc}
		          onChange={e => this.setState({ TDesc: e.target.value })} type="text" placeholder="" />
	<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">


<Form.Label>Terms and Conditions</Form.Label>
<Form.Control value={this.state.Terms}
onChange={e => this.setState({ Terms: e.target.value })} as="textarea" rows={10} />
</Form.Group>
						</Form.Group>
							<Button className="me-2" onClick={() => this.applyTerm()}>
					    Add
					  
					  </Button>
						</Form>
						
					</Modal.Body>
		</Modal>
     </div>
	<div className="body"><br/><br/><br/><header> <font size = "12">Terms and conditions</font></header>
	
			  <table className="table">
		  
		  <tr className="table-tr">
		    <td>Term Name</td>
		    <td>Term Description</td>
				<td>Terms</td>
			<td>Edit?</td>
			<td>Delete?</td>
		 			
		  </tr>
		  

		 {
		 				this.state.TermData.map((item, index) => {
		 					return <tr>
		 				   <td >{item.TermName}</td>
		 				   <td >{item.TermDesc}</td>
		 				   <td >{item.Terms}</td>
						   <td ><a href="javascript:;" onClick={() => this.setShow3(true,item.TermName,item.TermDesc,item.Terms,item.TermID)}>Edit</a></td>
						   <td ><a href="javascript:;" onClick={() => this.Tdelete(item.Tid)}>Delete</a></td>


							</tr>
		 				})
					}
						 </table>
	
	
	

						 <Button onClick={() => this.setShow4(true)} className="me-2" >
             add new
           </Button>
	
	
	
	
	
	</div>
	 </header>
  </div>

  	</>
	  

  );
  }
}

export default App;
