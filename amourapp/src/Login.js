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
			   show2:false,
		     index:0,
			 email:'',
			 remail:'',
			 code:'',
			 ccode:'',
			 oname:'',
			 cfname:'',
			 clname:'',
			 cnumber:'',
			 password:'',
			 cpassword:'',
			 rpassword:'',
			 rcpassword:'',
			 name:'adsf',
			 Org:"",
			 atype:'1',
			 
				};
				
     this.handleSelect = this.handleSelect.bind(this);
	 this.setShow = this.setShow.bind(this);
	 this.sigup = this.sigup.bind(this);
	 console.log(this.$url)
	 }
	 
	 
	 setShow(flag){
		 this.setState({show:flag})
	 } 
	 
	 setShow1(flag){
	 		 this.setState({show1:flag})
	 }
	 
	 setShow2(flag){
	 		 this.setState({show2:flag})
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
		 axios.post(this.$url+'/users/addOrg',data)
		 .then(res => {			
			console.log("insertId" in res.data)		
			 console.log(res.data.insertId)			 
			 
			this.setState({Org: (res.data.insertId)})
		   
		 })
		 .catch(err => {
			console.log(err);
		 })
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
					
					 if('Admin' in res.data[0]){
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
	 
	 sendCode(){
		 
		  var tv = this.state.remail;
		 var reg = /^\w+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/;
		 if(reg.test(tv)){
			 //alert('邮箱格式正确');
		 }else{
			 alert('E-mail format is incorrect')
		 }
		 
		 
		 axios.get(this.$url+'/users/sendEmail'+"?email="+this.state.remail)
		   .then(res => {
		 		 				 
		 				
		 					 //this.$login.login  = true;
							// console.log(res);
		 					var jsonObj = res.data;
                            console.log(jsonObj);
                            if(jsonObj.code == 1){
								    this.state.ccode = jsonObj.mes
									alert("Verification code sent, please check")
									 
							}else{
								
								alert("Failed to send verification code")
							}
		 					
		 
		 			
		   })
		   .catch(err => {
		      console.log(err);
		   })
		 
		 
		 

	 }
	 
	 //重置密码
	 res(){
	 		 
	 		 if(!this.state.remail){
	 			 alert("E-mail can not be empty")
	 			 return
	 		 }
	 		 
	 		 if(!this.state.rpassword){
	 		 			 alert("Password can not be empty")
	 		 			 return
	 		 }
			 
			 if(!this.state.code){
			 			 alert("verification code must be filled")
			 			 return
			 }
			 
			 if(this.state.rpassword != this.state.rcpassword ){
			 			 
			 			  alert("The two passwords entered are inconsistent")
			 			  return
			 }
			 
			 if(this.state.code != this.state.ccode){
			 			 alert("Incorrect verification code")
			 			 return
			 }
	 		 
	 		 var data  = this.state
	 		 		 
	 		 axios.post(this.$url+'/users/respassword',data)
	 		   .then(res => {
	 		 		 				 
	 				 if(res.data.affectedRows>0){
	 					 alert("reset Password successfully!")
						 this.setState({
							show2:false,
							remail:'',
							code:'',
							ccode:'',
							cpassword:'',
							rpassword:'',
							rcpassword:'',
							atype:'1',
							 })
	 					 //this.$login.login  = true;
	 					
	 					
	 				   //	this.props.history.push('/admin');
	 
	 				 }else{
	 					  alert("Password reset failed")
	 					  
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
					            <Form.Label>Username</Form.Label>
					            <Form.Control type="text" value={this.state.username}
					 					onChange={e => this.setState({ username: e.target.value })} placeholder="Enter username" />
					     
					          </Form.Group>
							  
							  <Form.Group className="mb-3" controlId="formBasicEmail">
							    <Form.Label>Password</Form.Label>
							    <Form.Control type="password" value={this.state.password}
					 					onChange={e => this.setState({ password: e.target.value })} placeholder="Enter Password" />
							  					     
							  </Form.Group>
							  
							    <Form.Group className="mb-3" controlId="formBasicCheckbox">
							      <Form.Check type="checkbox" label="Remember me" />
							    </Form.Group>
								
								<Form.Group className="mb-3" controlId="formBasicCheckbox">
								  <Button onClick={() => this.setShow2(true)} variant="link">forget password?</Button>
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
					    show={this.state.show2}
					    onHide={() => this.setShow2(false)}
					    aria-labelledby="example-modal-sizes-title-sm"
					  >
					    <Modal.Header closeButton>
					      <Modal.Title id="example-modal-sizes-title-sm">
					       Reset Password
					      </Modal.Title>
					    </Modal.Header>
					    <Modal.Body>
					    
					      <Form>
					           <Form.Group className="mb-3" controlId="formBasicEmail">
					             <Form.Label>Email</Form.Label>
					             <Form.Control type="text" value={this.state.remail}
					  					onChange={e => this.setState({ remail: e.target.value })} placeholder="Enter email" />
										
								<Col xs="auto" className="my-1">
									  <Button  onClick={() => this.sendCode()} type="button">Send the verification code</Button>
								</Col>
					      
					           </Form.Group>
					 		  
					 		  <Form.Group className="mb-3" controlId="formBasicEmail">
					 		    <Form.Label>Code</Form.Label>
					 		    <Form.Control type="text" value={this.state.code}
					  					onChange={e => this.setState({ code: e.target.value })} placeholder="Enter Code" />
					 		  					     
					 		  </Form.Group>
					 		  
					 		<Form.Group as={Col}  className="mb-3" controlId="formGridEmail">
					 						 <Form.Label>New Password</Form.Label>
					 									 
					 						 <Form.Control     value={this.state.rpassword}
					 							onChange={e => this.setState({ rpassword: e.target.value })} type="text" placeholder="" />
					 								
					 		</Form.Group>
					 		
					 		<Form.Group as={Col}  className="mb-3" controlId="formGridEmail">
					 						 <Form.Label>Conifm New Password</Form.Label>
					 									 
					 						 <Form.Control     value={this.state.rcpassword}
					 							onChange={e => this.setState({ rcpassword: e.target.value })} type="text" placeholder="" />
					 								
					 		</Form.Group>
							
							<Form.Group as={Col}  className="mb-3" controlId="formGridEmail">
							
								 <Form.Label>Type</Form.Label>
							   <Form.Select value={this.state.atype} onChange={e => this.setState({ atype: e.target.value })} >
							    <option value="1">User</option>
								 <option value="2">Customer</option>
							  </Form.Select>
							
							
							</Form.Group>
							
							
							 
								
								
					 			  
					      </Form>
					 	 
					 <div className="d-grid gap-2" onClick={() => this.res()}>
					   <Button variant="primary" size="sm">
					     Reset
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
								<Form.Group className="mb-3" controlId="formBasicEmail">
					            <Form.Label>Username</Form.Label>
					            <Form.Control type="text" value={this.state.username}
					 					onChange={e => this.setState({ username: e.target.value })} placeholder="Enter username" />
					     
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
