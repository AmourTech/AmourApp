import logo from './logo.svg';
import './App.css';
import React from 'react'


import { Nav, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Modal from 'react-bootstrap/Modal'
import axios from 'axios'; 


class App extends React.Component{
	
	constructor(props) {
	   super(props);
	   this.state = {
		          st :1,
				  email:'',
				  fname:'',
				  lname:'',
				  password:'',
				  viewdata:[],
				};
				
		this.adduser = this.adduser.bind(this);
		this.getuser =   this.getuser.bind(this);

	 }
	 
	 setMenu(num){
		  this.getuser()
	 	  this.setState({st: num});
	 }
	 
	 setShow(flag){
	 	 
	 	  this.setState({show: flag});
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
	 
	 
	 
	 
	 
	 getuser(){
		 
		 
	 axios.get(this.$url+'/users/getuser',null)
	 
	 
	 
		   .then(res => {
		 		 			
			  this.setState({viewdata:res.data})
										   
             
		     
		   })
		   .catch(err => {
		      console.log(err);
		   })
	 }
	 
	 adduser(){
		 
		 var data  = this.state 
		 axios.post(this.$url+'/users/adduser',data)
		   .then(res => {
		 		 				 				 
			 if(res.data==1){
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
	 
	 let admin = localStorage.getItem("admin")
	 
	 if(admin != 1){
		return (  <div className="App">
      <header className="App-header">
        <p>
          Settings
        </p>
      </header>
    </div>)
	 }
	 
	 
	 const isisd = this.state.st;
	 let view;
	 if (isisd == 1) {
		 
		 view = <> <Form>
	 
		 <Row className="mb-3">
		 
		
			 <Form.Group md="3"  as={Col} controlId="formGridAddress1">
			   <Form.Label>First Name</Form.Label>
			   <Form.Control  type="text" value={this.state.first}
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
		    <td>uesrname</td>
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
		 					<td ><a href="#" onClick={() => this.delete(item.UserID)}>delete</a></td>
		 				   
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
