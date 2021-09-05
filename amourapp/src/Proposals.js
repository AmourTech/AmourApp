import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import ReactFileReader from 'react-file-reader';

import { Nav, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Modal from 'react-bootstrap/Modal'
import axios from 'axios'; 
import data from './Comm';
import { CSVLink, CSVDownload } from "react-csv";
var reader = new FileReader();
class App extends React.Component{
	
	 constructor(props) {
	    super(props);
	    this.state = {
			   st :1,
			   viewdata:[],
			   viewdata1:[],
			   viewdata2:[],
			    clients:[],
			   name:"", 
			  client:"", 
			  contact:"12 Month...",
			  sdate:"", 
			  edate:"", 
			  clen:"12 Month", 
			  message:"", 
			  acc:"0", 
			  pay1:"Weekly...", 
			  pay2:"On Acceptance...",
			  show:false,
			  show1:false,
			  mes:"",
			  userid:'',
			  
			};
			
			this.sub = this.sub.bind(this);
			this.setShow = this.setShow.bind(this);
			this.setShow1 = this.setShow1.bind(this);
			this.setMenu = this.setMenu.bind(this);
			this.delete = this.delete.bind(this);
			this.duplicate = this.duplicate.bind(this);
	  }
	  
	  componentDidMount() {
	      this.getList()
	   }
	  
	  
	    componentWillMount(){
			axios.get(this.$url+'/users/add',null)
			  .then(res => {
							 
				 // this.setState({viewdata: res.data});
				   console.log(res.data)
			   
			  })
			  .catch(err => {
			     console.log(err);
			  })
			  
			  
			  this.getClient();
			
	        
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
	

   
    getList(){
		
		console.log(localStorage.getItem("user"))
		let view  = JSON.parse(localStorage.getItem("user"))[0]
		let admin  = JSON.parse(localStorage.getItem("admin"))[0]
		 let url = ''
		if(admin === 1){
			url = this.$url+'/users/find?id='+view.Organisation
		}else{
			url = this.$url+'/users/findus?id='+view.UserID
		}
		
		axios.get(url,null)
		  .then(res => {
				
				  this.setState({viewdata: res.data});		 
			  // this.state.viewdata =  res.data
			   console.log(res.data)
					
						 
		   
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
		  
		console.log('startup');
		let admin  = JSON.parse(localStorage.getItem("admin"))[0]
		 console.log(admin);
		  
		  if(admin == 1){
		 	return (  <>
		 	<div className="App">
		 	  <header className="App-header1">
		 	   
		 		
		 		<div className="body">
		 		 		
		 		
		 		 <table className="table">
		 		  
		 		  <tr className="table-tr">
		 		    <td>Proposal Name</td>
		 		    <td>Client</td>
		 		    <td>Contact</td>
		 		 	<td>Start Date</td>
		 		 	<td>Start Date</td>
		 		 	<td>Minimun Contract Length</td>
		 		 	<td>Recurring Billing</td>
		 		 	<td>One time Billing</td>
		 		 	<td>Proposal status</td>
		 		 	<td>operate</td>
		 		  </tr>
		 		  
		 		 {
		 		                    this.state.viewdata.map((item, index) => {
		 		                        return <tr>
		 		 					   <td >{item.name}</td>
		 		 					   <td >{item.client}</td>
		 		 					   <td >{item.contact}</td>
		 		 					   <td >{item.sdate}</td>
		 		 					   <td >{item.edate}</td>
		 		 					   <td >{item.clen}</td>
		 		 					   <td >{item.pay1}</td>
		 		 					   <td >{item.pay2}</td>
		 		 					   <td >{item.acc == 0 ?  'Pending' : item.acc}</td>
		 		 					   <td ><a href="javascript:;" onClick={() => this.acc(item.id,'Agree')}>Agree</a><a href="javascript:;" onClick={() => this.acc(item.id,'Refuse')}>Refuse</a><a onClick={() => this.setShow1(true,item.message)} href="javascript:;" >Proposal content</a></td>
		 		 					   
		 		 					 
		 		 					   </tr>
		 		                    })
		 		                }
		 		 
		 		  </table>
		 		
		 		</div>
		 		
		 	  
		 	  </header>
		 	</div>
		 	 <Modal show={this.state.show1} fullscreen={true} onHide={() => this.setShow1(false,'')}>
		 	   <Modal.Header closeButton>
		 	     <Modal.Title>Proposal Edit</Modal.Title>
		 	   </Modal.Header>
		 	   <Modal.Body>
		 	 				<Form>
		 	 						
		 	 						  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
		 	 							<Form.Label>content</Form.Label>
		 	 							<Form.Control value={this.state.mes}
		 	           as="textarea" rows={10} />
		 	 						  </Form.Group>
		 	 				</Form>
		 	 				
		 	 			</Modal.Body>
		 	 </Modal>
		 	</>)
		  }
         
           const isisd = this.state.st;
		   let view;

		   if (isisd == 1) {
			 view =<>
			 
			 <Form>
			   <Row className="mb-3">
			     <Form.Group as={Col}  md="3" controlId="formGridEmail">
			       <Form.Label>Proposal Name</Form.Label>
			 	 
			       <Form.Control     value={this.state.name}
			          onChange={e => this.setState({ name: e.target.value })} type="text" placeholder="" />
			 	<Form.Text className="text-muted">
			 	    Add a friendly name to dientify this proposal.
			 	  </Form.Text>
			     </Form.Group>
			 
			     <Form.Group as={Col} md="3" controlId="formGridPassword">
			       <Form.Label>Client</Form.Label>
			      <Form.Select value={this.state.client}
			          onChange={e => this.setState({ client: e.target.value })} defaultValue="Choose...">
			         <option value="">Choose...</option>
					{
						   this.state.clients.map((item, index) => {
							   return  <option value={item.ContactID} >{item.organ}</option>
						   })
					 }
					
			      </Form.Select>
			 	 <Form.Text className="text-muted">
			 	     Select who this proposal is for or quickly add aclient
			 	   </Form.Text>
			     </Form.Group>
			   </Row>
			 					
			 					
			 					<Row className="mb-3">
			 					  <Form.Group  md="3" as={Col} controlId="formGridEmail">
			 					    <Form.Label>Contact</Form.Label>
			 					  <Form.Select value={this.state.contact}
			          onChange={e => this.setState({ contact: e.target.value })} defaultValue="Choose...">
			 					    <option value="1">Choose an option...</option>
									
			 					  {
			 					  	   this.state.clients.map((item, index) => {
			 					  		   return  <option value={item.ContactID} >{item.Fname} {item.Lname}</option>
			 					  	   })
			 					   }
								   
			 					  </Form.Select>
			 					  
			 					  </Form.Group>
			 								      
			 					  <Form.Group md="3" as={Col} controlId="formGridPassword">
			 					    <Form.Label>Effective Start Date</Form.Label>
			 					   <Form.Select value={this.state.sdate}
			          onChange={e => this.setState({ sdate: e.target.value })} defaultValue="Choose...">
			 		                 <option value="">Choose...</option>
			 		                 <option value="3 months">3 months</option>
			 					     <option value="6 months">6 months</option>
			 					     <option value="12 months">12 months</option>
			 					   </Form.Select>
			 					  </Form.Group>
			 					</Row>
			 					
			 <Row className="mb-3">
			   <Form.Group md="3"  as={Col} controlId="formGridAddress1">
			     <Form.Label>Effiective Start Date</Form.Label>
			     <Form.Control  type="date" value={this.state.edate}
			          onChange={e => this.setState({ edate: e.target.value })}  placeholder="1234 Main St" />
			   </Form.Group>
			 </Row>
			 
			 <Row className="mb-3">
			   <Form.Group md="3"  as={Col} controlId="formGridAddress2">
			     <Form.Label>Minimum Contract Length</Form.Label>
			     <Form.Select value={this.state.clen}
			          onChange={e => this.setState({ clen: e.target.value })}  defaultValue="Choose...">
			       <option value="12 Moth">12 Month...</option>
			       <option value="6 Month">6 Month...</option>
			 	  <option value="3 Month">3 Month...</option>
			     </Form.Select>
			   </Form.Group>
			   
			   </Row>
			 
			   <Row className="mb-3">
			 			 
			 
			     <Form.Group md="2" as={Col} controlId="formGridState">
			       <Form.Label>Recurring Billing</Form.Label>
			       <Form.Select value={this.state.pay1}
			          onChange={e => this.setState({ pay1: e.target.value })}  defaultValue="Weekly...">
			         <option value="Weekly">Weekly...</option>
			         <option value="Month">Month...</option>
			       </Form.Select>
			     </Form.Group>
			 
			     <Form.Group md="2" as={Col} controlId="formGridState">
			       <Form.Label>One time Billing</Form.Label>
			       <Form.Select value={this.state.pay2}
			          onChange={e => this.setState({ pay2: e.target.value })} defaultValue="Choose...">
			         <option value="On Acceptance">On Acceptance...</option>
			        
			       </Form.Select>
			     </Form.Group>
			   </Row>
			   
			   <Button className="me-2" onClick={() => this.setShow(true)}>
			     Next
			   
			   </Button>
			   
			   
			   <Modal show={this.state.show} fullscreen={true} onHide={() => this.setShow(false)}>
			     <Modal.Header closeButton>
			       <Modal.Title>Proposal Edit</Modal.Title>
			     </Modal.Header>
			     <Modal.Body>
			   				<Form>
			   						
			   						  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
			   							<Form.Label>content</Form.Label>
			   							<Form.Control value={this.state.message}
			             onChange={e => this.setState({ message: e.target.value })} as="textarea" rows={10} />
			   						  </Form.Group>
			   				</Form>
			   				
			   				<Button onClick={this.sub} className="me-2" >
			   				  Send
			   				
			   				</Button>
			   			</Modal.Body>
			   </Modal>
			   					
			   	   
			 		
			 </Form>
			 
			 
			 </>;
		   } else {
			 
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
				<td>Recurring Billing</td>
				<td>One time Billing</td>
				<td>Proposal status</td>
				<td>operate</td>
			 </tr>
			 
			{
			                   this.state.viewdata.map((item, index) => {
			                       return <tr>
								   <td >{item.name}</td>
								   <td >{item.client}</td>
								   <td >{item.contact}</td>
								   <td >{item.sdate}</td>
								   <td >{item.edate}</td>
								   <td >{item.clen}</td>
								   <td >{item.pay1}</td>
								   <td >{item.pay2}</td>
								   <td >{item.acc == 0 ?  'Pending' : item.acc}</td>
								   <td ><a href="javascript:;" onClick={() => this.delete(item.id)}>delete</a><a onClick={() => this.setShow1(true,item.message)} href="javascript:;" >Proposal content</a><a href="javascript:;" onClick={() => this.duplicate(item.id)}>duplicate</a></td>
		
								   </tr>
			                   })
			               }
			
			 </table> </>;
		   }
  
		   const csvReport = {
			filename: 'Report.csv',
			//headers: headers,
			data: this.state.viewdata
		}
  
  
  
  return (
		<>

    

      
	
	<div className="App">
	  <header className="App-header1">
	   
		
		<div className="body">
		<CSVLink {...csvReport}> Export to CSV</CSVLink>
		<ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
    <button className='btn'>Upload</button>
</ReactFileReader>
		<Nav fill variant="tabs" defaultActiveKey="link-1">
		  <Nav.Item>
		    <Nav.Link  onClick={() => this.setMenu(1)} eventKey="link-1" >Create new Proposals</Nav.Link>
		  </Nav.Item>
		  <Nav.Item>
		    <Nav.Link href="" onClick={() => this.setMenu(2)}  eventKey="link-2">View Proposals</Nav.Link>
		  </Nav.Item>
		
		</Nav>
		

		
		
		{view}
		
		
		
		
		<Modal show={this.state.show1} fullscreen={true} onHide={() => this.setShow1(false,'')}>
		  <Modal.Header closeButton>
		    <Modal.Title>Proposal Edit</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
						<Form>
								
								  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
									<Form.Label>content</Form.Label>
									<Form.Control value={this.state.mes}
		          as="textarea" rows={10} />
								  </Form.Group>
						</Form>
						
					</Modal.Body>
		</Modal>
		
		
		</div>
		
				
		   
	    
	 
		
		
		
		
	     
	    
	  
	  </header>
	</div>
  
		</>
  )};
}

export default App
