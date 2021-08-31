import logo from './logo.svg';
import React from 'react'


import { Nav, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import { HashRouter,Route } from 'react-router-dom'

import Home from './App'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'; 


class App extends React.Component{
	
	constructor(props) {
	   super(props);
	   this.state = {
		     show:false,
			  show1:false,
		     index:0,
			 email:'',
			 oname:'',
			 cfname:'',
			 clname:'',
			 cnumber:'',
			 password:'',
			 cpassword:'',
			 name:'adsf',
			 
				};
				
     this.handleSelect = this.handleSelect.bind(this);
	 this.setShow = this.setShow.bind(this);
	 
	 console.log(this.$url)
	 }
	 
	 
	 setShow(flag){
		 this.setState({show:flag})
	 } 
	 
	 setShow1(flag){
	 		 this.setState({show1:flag})
	 } 
	 
	 
	 sigup(){
		 
		 if(!this.state.oname || !this.state.email || !this.state.cfname || !this.state.clname || !this.state.cnumber|| !this.state.password|| !this.state.cpassword){
			 
			 alert("The input box cannot be empty")
			 return
		 }
		 
		 if(this.state.password != this.state.cpassword ){
			 
			  alert("The two passwords entered are inconsistent")
			  return
		 }
		 
		 var data  = this.state
		 		 
		 axios.post(this.$url+'/users/addc',data)
		   .then(res => {
		 		 				 
		 		 				 
		 		 				 if(res.data==1){
		 		 					 this.setState({password:'',email:''})
		 		 					 alert("Create successfully! please sign in")
		 		 					 this.setShow1(false);
		 		 					 //this.setShow(false)
		 		 					 
		 		 				 }else{
		 		 					 
		 		 					 
		 		 				 }
		 		 				 
		    
		   })
		   .catch(err => {
		      console.log(err);
		   })
		 
		 
		 
		
	 }
	 
	 handleSelect(index){
		 this.setState({index:index})
	 }
	 
	 login(){
		 
		 if(!this.state.email){
			 alert("E-mail can not be empty")
			 return
		 }
		 
		 if(!this.state.password){
		 			 alert("Password can not be empty")
		 			 return
		 }
		 
		 var data  = this.state
		 		 
		 axios.post(this.$url+'/users/login',data)
		   .then(res => {
		 		 				 
				 if(res.data!=0){
					 alert("Login successfully!")
					 //this.$login.login  = true;
					 if('ContactID' in res.data[0]){
						  localStorage.setItem("admin", 1)
					 }else{
						  localStorage.setItem("admin", 0)
					 }
					 localStorage.setItem("user", JSON.stringify(res.data))
					this.props.history.push('/admin');

				 }else{
					  alert("Incorrect email or password!")
					  
				 }
		   })
		   .catch(err => {
		      console.log(err);
		   })
		 
		 
	 }
	 
	
	
 render() {	
	 
	  return (
	  
			<>
			  <Navbar bg="light" variant="light">
				<Container>
				<Navbar.Brand href="#home">Main Features</Navbar.Brand>
				<Nav className="me-auto">
				
				  <Nav.Link href="#features">Pricing</Nav.Link>
				  <Nav.Link href="#pricing">Resources</Nav.Link>
				  <Nav.Link href="#Customer">Customer Service</Nav.Link>
				  <Nav.Link href="#Customer">Customer Service</Nav.Link>
				
					<Button onClick={() => this.setShow1(true)} className="mar1" variant="outline-primary">Sign Up</Button>{' '}
					<Button onClick={() => this.setShow(true)} className="mar" variant="primary">Log in</Button>{' '}
					 
					  
					
				</Nav>
				</Container>
			  </Navbar>
			  
			         <Modal
			           size="sm"
			           show={this.state.show}
			           onHide={() => this.setShow(false)}
			           aria-labelledby="example-modal-sizes-title-sm"
			         >
			           <Modal.Header closeButton>
			             <Modal.Title id="example-modal-sizes-title-sm">
			              Login
			             </Modal.Title>
			           </Modal.Header>
			           <Modal.Body>
					   
					     <Form>
					          <Form.Group className="mb-3" controlId="formBasicEmail">
					            <Form.Label>Email</Form.Label>
					            <Form.Control type="text" value={this.state.email}
					 					onChange={e => this.setState({ email: e.target.value })} placeholder="Enter email" />
					     
					          </Form.Group>
							  
							  <Form.Group className="mb-3" controlId="formBasicEmail">
							    <Form.Label>Password</Form.Label>
							    <Form.Control type="password" value={this.state.password}
					 					onChange={e => this.setState({ password: e.target.value })} placeholder="Enter Password" />
							  					     
							  </Form.Group>
							  
							    <Form.Group className="mb-3" controlId="formBasicCheckbox">
							      <Form.Check type="checkbox" label="Remember me" />
							    </Form.Group>
								
								  
					     </Form>
						 
					<div className="d-grid gap-2" onClick={() => this.login()}>
					  <Button variant="primary" size="sm">
					    Login
					  </Button>
					</div>
						 
					   </Modal.Body>
			         </Modal>
					 
					 
					 <Modal
					    size="sm"
					    show={this.state.show1}
					    onHide={() => this.setShow1(false)}
					    aria-labelledby="example-modal-sizes-title-sm"
					  >
					    <Modal.Header closeButton>
					      <Modal.Title id="example-modal-sizes-title-sm">
					       Sign up
					      </Modal.Title>
					    </Modal.Header>
					    <Modal.Body>
					    
					      <Form>
					           
					 			<Form.Group className="mb-3" controlId="formGridEmail">
					 					 <Form.Label>Organisation Name</Form.Label>
					 								 
					 					 <Form.Control     value={this.state.oname}
					 						onChange={e => this.setState({ oname: e.target.value })} type="text" placeholder="" />
					 							
					 			</Form.Group>
								
								
								<Form.Group as={Col}  className="mb-3" controlId="formGridEmail">
													 <Form.Label>Email</Form.Label>
																 
													 <Form.Control     value={this.state.email}
														onChange={e => this.setState({ email: e.target.value })} type="text" placeholder="" />
															
								</Form.Group>
								
								
								<Form.Group as={Col}  className="mb-3" controlId="formGridEmail">
													 				 <Form.Label>Contact First Name</Form.Label>
													 							 
													 				 <Form.Control     value={this.state.cfname}
													 					onChange={e => this.setState({ cfname: e.target.value })} type="text" placeholder="" />
													 						
								</Form.Group>
								
								
								<Form.Group as={Col}  className="mb-3" controlId="formGridEmail">
												 <Form.Label>Contact last Name</Form.Label>
															 
												 <Form.Control     value={this.state.clname}
													onChange={e => this.setState({ clname: e.target.value })} type="text" placeholder="" />
														
								</Form.Group>
								
								
								<Form.Group as={Col}  className="mb-3" controlId="formGridEmail">
												 <Form.Label>Contact number</Form.Label>
															 
												 <Form.Control     value={this.state.cnumber}
													onChange={e => this.setState({ cnumber: e.target.value })} type="text" placeholder="" />
														
								</Form.Group>
								
								<Form.Group as={Col}  className="mb-3" controlId="formGridEmail">
												 <Form.Label>Password</Form.Label>
															 
												 <Form.Control     value={this.state.password}
													onChange={e => this.setState({ password: e.target.value })} type="text" placeholder="" />
														
								</Form.Group>
								
								<Form.Group as={Col}  className="mb-3" controlId="formGridEmail">
												 <Form.Label>Conifm Password</Form.Label>
															 
												 <Form.Control     value={this.state.cpassword}
													onChange={e => this.setState({ cpassword: e.target.value })} type="text" placeholder="" />
														
								</Form.Group>
					 			  
					      </Form>
					 	 
					 <div className="d-grid gap-2" onClick={() => this.sigup()}>
					   <Button variant="danger" size="sm">
					     SignUp
					   </Button>
					 </div>
					 	 
					    </Modal.Body>
					  </Modal>
			        
			 
			</>
	  );
  }
}

export default App;
