import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'


import { Nav, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Modal from 'react-bootstrap/Modal'
import axios from 'axios'; 
//add terms and conditions that are customisable
var servicecheck =0;

class App extends React.Component{
	
	constructor(props) {
	   super(props);
	   let organ  = (JSON.parse(localStorage.getItem("user"))[0])
	   this.state = {
		   			//test org
		   		  org :organ.Organisation,
				  Admin: false,
				
		          st :1,
				  email:'',
				  fname:'',
				  lname:'',
				  password:'',
				  viewdata:[],


				  Dbill:'',
				  SPrice:'',
				  TRate:'',
				  Xero:'',
				};

		this.handleAdmin = this.handleAdmin.bind(this);
		this.adduser = this.adduser.bind(this);
		this.getuser =   this.getuser.bind(this);
		this.delete = this.delete.bind(this);
		this.applyService = this.applyService.bind(this);
		this.getService = this.getService.bind(this);
		
	 }

	 componentDidMount() {
		this.getService()
	 }
	 getService(){
		var id = this.state.org
		axios.get(this.$url+'/users/getservo?id='+id,null)
		.then(res=>{
					var item = (res.data)[0]
					console.log(item)		 
						this.setState({Xero:item.XeroAccount})
						this.setState({Dbill:item.DBill})
						this.setState({SPrice:item.StandardPrice})
						//0 or 10%
						this.setState({TRate:item.TaxRate})
					   
		})
		.catch(err => {
			console.log(err);
		 })


	 }

	 applyService(){
		 if(window.confirm("confirm apply"))
		var data= this.state
		axios.post(this.$url+'/users/applyservo',data)
		.then(res=>{
			if(res.data===1){
			alert("Applied Settings Succesfuly!")
			//this.setShow(false)

			
		}else{
			 alert("failed")
		   
		}
	})
	this.getService();

	 }
	 setMenu(num){
		  this.getuser()
	 	  this.setState({st: num});
			
	 }
	 
	 setShow(flag){
	 	 
	 	  this.setState({show: flag});
	 }
	 getuser(){
		 
		 
		axios.get(this.$url+'/users/getuser',null)
		
		
		
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
	 
	 handleAdmin (event) {
			const name = event.target.name;
			const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
			this.setState({
				[name]: value
			})
	 }
	 
	 
	 

	 
	 adduser(){
		 
		 var data  = this.state 
		 axios.post(this.$url+'/users/adduser',data)
		   .then(res => {
		 		 				 				 
			 if(res.data===1){
				 alert("Create  User successfully!")
				 //this.setShow(false)
				 
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
	<Form>

		 
		
			 <Form.Group md="3"  as={Col} controlId="formGridAddress1">
			   <Form.Label>Default Billing Type</Form.Label>
			   <Form.Select  value={this.state.Dbill}
					onChange={e => this.setState({ Dbill: e.target.value })}   >

					<option value="At">On Completion</option>
					<option value="End">On Sign</option>
					<option value="Start">Recuring</option>
					</Form.Select>
				</Form.Group>		
					name
				<br/>
					description

			<Form.Group md="3"  as={Col} controlId="formGridAddress1">
			  <Form.Label>Standard Price</Form.Label>
			  <Form.Control  type="text" value={this.state.SPrice}
				   onChange={e => this.setState({ SPrice: e.target.value })}   />
			</Form.Group>

			<Form.Group md="3"  as={Col} controlId="formGridAddress1">
				 0% or 10%
			   <Form.Label>Tax Rate</Form.Label>
			   <Form.Control  type="choice" value={this.state.TRate}
					onChange={e => this.setState({ TRate: e.target.value })}   />
				</Form.Group>		
					
			<Form.Group md="3"  as={Col} controlId="formGridAddress1">
				different xero account for each service if wanted
			  <Form.Label>Xero Account</Form.Label>
			  <Form.Control  type="text" value={this.state.Xero}
				   onChange={e => this.setState({ Xero: e.target.value })}   />
			</Form.Group>
			
		 </Form>
		 <Button onClick={() => this.applyService()} className="me-2" >
             apply
           
           </Button>
		<br></br>
		<br></br>





	
	
	<Nav fill variant="tabs" defaultActiveKey="link-1">
	  <Nav.Item>
	    <Nav.Link  onClick={() => this.setMenu(1)} eventKey="link-1" >Create user</Nav.Link>
	  </Nav.Item>
	  <Nav.Item>
	    <Nav.Link onClick={() => this.setMenu(2)}  eventKey="link-2">View user</Nav.Link>
	  </Nav.Item>
	
	</Nav>
	
	
	{view}
	
     </div>
	 
	 </header>
  </div>
  	</>
  );
  }
}

export default App;
