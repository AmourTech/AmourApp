import logo from './logo.svg';
import './App.css';
import React from 'react'


import { Nav, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Modal from 'react-bootstrap/Modal'
import axios from 'axios'

class App extends React.Component {
	
	
	constructor(props) {
	   super(props);
	   this.state = { 
		   
		 st :1,
		 clients:[],
		 oname:'',
		 email:'',
		 cfname:'',
		 clname:'',
		 cnumber:'',
		 password:'',
		 name:'adsf',
		 viewdata:[],
	   };
			
	   this.setMenu = this.setMenu.bind(this);
	   this.getList = this.getList.bind(this);
	 }
	 
	 componentDidMount() {
	     this.getList()
	  }
	 
	 getList(){
	 	
	 	axios.get(this.$url+'/users/get',null)
	 	  .then(res => {
	 			
	 		   this.setState({viewdata: res.data});		 
	 		   console.log(res.data)
	 	   
	 	  })
	 	  .catch(err => {
	 	     console.log(err);
	 	  })
	 }
	 
	 
	 delete(id){
	 	
	 	if (window.confirm("confirm delete?")) {
	 	  axios.get(this.$url+'/users/udel?id='+id,null)
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
	  
	 
	 
	 
	 setMenu(num){
		  this.getList()
	 	  this.setState({st: num});
	 }
	 
	 create(){
		 
		   var data  = this.state
		 
		   axios.post(this.$url+'/users/addc',data)
		     .then(res => {
		 				 
		 				 
		 				 if(res.data==1){
		 					 
		 					 alert("Create successfully!")
		 					 
		 					 //this.setShow(false)
		 					 
		 				 }else{
		 					 
		 					 
		 				 }
		 				 
		      
		     })
		     .catch(err => {
		        console.log(err);
		     })
		 
	 }
	
render() {
	
	
	let admin = localStorage.getItem("admin")
	 
	 if(admin != 1){
		return (  <>
 	<div className="App">
 	  <header className="App-header1">
 	   
 		
 		<div className="body">
 		 		
		
		 <table className="table">
		  
		  <tr className="table-tr">
		    <td>Client</td>
		    <td>Contact</td>
		    <td>Email</td>
		 			
		  </tr>
		  
		 {
		 				this.state.viewdata.map((item, index) => {
		 					return <tr>
		 				   <td >{item.organ}</td>
		 				   <td >{item.Fname} {item.Lname}</td>
		 				   <td >{item.Email}</td>
		 			
		 				   
		 				 
		 				   </tr>
		 				})
		   }
		 
		  </table> 
 		
 		</div>
 		
 	  
 	  </header>
 	</div>
 
 	</>)
	 }
	
	const isisd = this.state.st;
	let view;
	
	
	 if (isisd == 1) {
		 
		 view = <> 
		    
			<Form>
					 
					 <Row className="mb-3">
					 
				
					 
			<Form.Group as={Col}  md="3" controlId="formGridEmail">
					 <Form.Label>Organisation Name</Form.Label>
								 
					 <Form.Control     value={this.state.oname}
						onChange={e => this.setState({ oname: e.target.value })} type="text" placeholder="" />
							
			</Form.Group>
						   
			<Form.Group as={Col}  md="3" controlId="formGridEmail">
								 <Form.Label>Email</Form.Label>
											 
								 <Form.Control     value={this.state.email}
									onChange={e => this.setState({ email: e.target.value })} type="text" placeholder="" />
										
			</Form.Group>
									 
						  
					 </Row>
					 
					 
					 <Row className="mb-3">
					 			   <Form.Group as={Col}  md="3" controlId="formGridEmail">
					 				 <Form.Label>Contact First Name</Form.Label>
					 							 
					 				 <Form.Control     value={this.state.cfname}
					 					onChange={e => this.setState({ cfname: e.target.value })} type="text" placeholder="" />
					 						
					 			   </Form.Group>
					 			   
					 			   <Form.Group as={Col}  md="3" controlId="formGridEmail">
					 			   				 <Form.Label>Contact last Name</Form.Label>
					 			   							 
					 			   				 <Form.Control     value={this.state.clname}
					 			   					onChange={e => this.setState({ clname: e.target.value })} type="text" placeholder="" />
					 			   						
					 			   </Form.Group>
								   
								   
					 						 
					 			  
					 </Row>
					 
					 
					 <Row className="mb-3">
					 <Form.Group as={Col}  md="3" controlId="formGridEmail">
					 				 <Form.Label>Contact number</Form.Label>
					 							 
					 				 <Form.Control     value={this.state.cnumber}
					 					onChange={e => this.setState({ cnumber: e.target.value })} type="text" placeholder="" />
					 						
					 </Form.Group>
					 
					 
					 <Form.Group as={Col}  md="3" controlId="formGridEmail">
					 				 <Form.Label>Password</Form.Label>
					 							 
					 				 <Form.Control     value={this.state.password}
					 					onChange={e => this.setState({ password: e.target.value })} type="text" placeholder="" />
					 						
					 </Form.Group>
					 
					  </Row>
					  
					  <Button className="me-2" onClick={() => this.create()}>
					    Create
					  
					  </Button>
					 
					 </Form>
		 
		 </>
		 
	 }else{
		 
		 
		 view=
		  <>
		  <table className="table">
		  
		  <tr className="table-tr">
		    <td>Client</td>
		    <td>Contact</td>
		    <td>Email</td>
			
		  </tr>
		  
		 {
				this.state.viewdata.map((item, index) => {
					return <tr>
				   <td >{item.organ}</td>
				   <td >{item.Fname} {item.Lname}</td>
				   <td >{item.Email}</td>
					<td ><a href="javascript:;" onClick={() => this.delete(item.ContactID)}>delete</a></td>
				   
				 
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
 		
 		
 		<Nav fill variant="tabs" defaultActiveKey="link-1">
 		  <Nav.Item>
 		    <Nav.Link  onClick={() => this.setMenu(1)} eventKey="link-1" >Create new Client</Nav.Link>
 		  </Nav.Item>
 		  <Nav.Item>
 		    <Nav.Link onClick={() => this.setMenu(2)}  eventKey="link-2">Client History</Nav.Link>
 		  </Nav.Item>
 		
 		</Nav>
 		
		
		 {view}
 		
 		</div>
 		
 	  
 	  </header>
 	</div>
 
 	</>
 )};
}

export default App;
