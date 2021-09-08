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
import { CSVLink, CSVDownload } from "react-csv";
import {readString, CSVReader} from 'react-papaparse';
const buttonRef = React.createRef();

class App extends React.Component {
	
	
	constructor(props) {
	   super(props);
	   this.state = { 
		   
		 st :1,
		 clients:[],
		 clientname:'',
		 abn:'',
		 acn:'',
		 baddress:'',
		 bsbname:'',
		 bsbaccountn:'',
		 contact:'',
		 tfn:'',
		 type:'',
		 Handler:0,
		//  Fname: '',
		//  Lname: '',
		//  email:'',
		 viewdata:[],
		 importer:[{}],
	   };
			
	   this.setMenu = this.setMenu.bind(this);
	   this.getList = this.getList.bind(this);
	   this.create = this.create.bind(this);
	   this.handleOnFileLoad = this.handleOnFileLoad.bind(this);
	   this.handleOnRemoveFile = this.handleOnRemoveFile.bind(this);
	   this.handleconfirm = this.handleconfirm.bind(this);
	 }
	 
	 componentDidMount() {
	     this.getList()
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
			console.log(csv.data)
			this.addnoalert(csv.data)
		))
		window.confirm('import confirmed')
		console.log(csv.length)
	  }
	  addnoalert(data){
		axios.post(this.$url+'/users/addclient',data)
		.then(res => {
						 
						 
			if(res.data==1){
				
			   this.getList();
				
			}else{
				
				
			}
			
	
	})
}
	 getList(){
	 	
	 	axios.get(this.$url+'/users/getcl',null)
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
		let admin  = JSON.parse(localStorage.getItem('user'))[0]
		console.log(admin.Organisation)
		this.setState({Handler: admin.Organisation})

		   var data  = this.state
		 
		   axios.post(this.$url+'/users/addcl',data)
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
	
	
	let admin  = JSON.parse(localStorage.getItem("admin"))[0]
	 if(admin === 1){
		return (  <>
 	<div className="App">
 	  <header className="App-header1">
 	   
 		
 		<div className="body">
 		 		
		
		 <table className="table">
		  
		  <tr className="table-tr">
		    <td>Client</td>
		    <td>Contact</td>
		 			
		  </tr>
		  
		 {
		 				this.state.viewdata.map((item, index) => {
		 					return <tr>
		 				   <td >{item.clientname}</td>
		 				   <td >{item.Contact}</td>
		 			
		 				   
		 				 
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
					 <Form.Label>Client Name</Form.Label>
								 
					 <Form.Control     value={this.state.clientname}
						onChange={e => this.setState({ clientname: e.target.value })} type="text" placeholder="" />
							
			</Form.Group>
						   
			<Form.Group as={Col}  md="3" controlId="formGridEmail">
								 <Form.Label>ABN</Form.Label>
											 
								 <Form.Control     value={this.state.abn}
									onChange={e => this.setState({ abn: e.target.value })} type="text" placeholder="" />
										
			</Form.Group>
									 
						  
					 </Row>
					 
					 
					 <Row className="mb-3">
					 			   <Form.Group as={Col}  md="3" controlId="formGridEmail">
					 				 <Form.Label>Contact</Form.Label>
					 							 
					 				 <Form.Control     value={this.state.contact}
					 					onChange={e => this.setState({ contact: e.target.value })} type="text" placeholder="" />
					 						
					 			   </Form.Group>
					 			   
					 			   <Form.Group as={Col}  md="3" controlId="formGridEmail">
					 			   				 <Form.Label>ACN</Form.Label>
					 			   							 
					 			   				 <Form.Control     value={this.state.acn}
					 			   					onChange={e => this.setState({ acn: e.target.value })} type="text" placeholder="" />
					 			   						
					 			   </Form.Group>
								   
								   
					 						 
					 			  
					 </Row>
					 <Row className="mb-3">
					 <Form.Group as={Col}  md="3" controlId="formGridEmail">
					 				 <Form.Label>Business Address</Form.Label>
					 							 
					 				 <Form.Control     value={this.state.baddress}
					 					onChange={e => this.setState({ baddress: e.target.value })} type="text" placeholder="" />
					 						
					 </Form.Group>
					 
					 
					 <Form.Group as={Col}  md="3" controlId="formGridEmail">
					 				 <Form.Label>Business Name</Form.Label>
					 							 
					 				 <Form.Control     value={this.state.bsbname}
					 					onChange={e => this.setState({ bsbname: e.target.value })} type="text" placeholder="" />
					 						
					 </Form.Group>
					 
					  </Row>

						<Row className="mb-3">

						<Form.Group as={Col}  md="3" controlId="formGridEmail">
					 				 <Form.Label>BSB Account Number</Form.Label>
					 							 
					 				 <Form.Control     value={this.state.bsbaccountn}
					 					onChange={e => this.setState({ bsbaccountn: e.target.value })} type="text" placeholder="" />
					 						
					 </Form.Group>

					 <Form.Group as={Col}  md="3" controlId="formGridEmail">
					 				 <Form.Label>Tax file number</Form.Label>
					 							 
					 				 <Form.Control     value={this.state.tfn}
					 					onChange={e => this.setState({ tfn: e.target.value })} type="text" placeholder="" />
						</Form.Group>

						<Form.Group as={Col}  md="3" controlId="formGridEmail">
					 				 <Form.Label>Type</Form.Label>
					 							 
					 				 <Form.Control     value={this.state.type}
					 					onChange={e => this.setState({ type: e.target.value })} type="text" placeholder="" />
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
			
		  </tr>
		  
		 {
				this.state.viewdata.map((item, index) => {
					return <tr>
				   <td >{item.clientname}</td>
				   <td >{item.Contact}</td>
					<td ><a href="javascript:;" onClick={() => this.delete(item.ContactID)}>delete</a></td>
				   
				 
				   </tr>
				})
		   }
		 
		  </table> </>;
		 
		 
	 }


	const headers = [
		{ label: "Client Name", key: "clientname" },
		{ label: "Contact", key: "contact" },
		{ label: "Contact", key: "contact" },
		{ label: "Contact", key: "contact" },
		{ label: "Contact", key: "contact" },
		{ label: "Contact", key: "contact" },
		{ label: "Contact", key: "contact" },
	];

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
		 <CSVReader   ref={buttonRef}
  onFileLoad={this.handleOnFileLoad}
  onError={this.handleOnError}
  noClick
  noDrag
  noProgressBar
  config={{header: true}}
  style={{}}
  onRemoveFile={this.handleOnRemoveFile}
  >
  {({ file }) => (
    <div>
      <button
        type='button'
        onClick={this.handleOpenDialog}
      >
          Import CSV
      </button>
        {file && file.name}
      <button onClick={this.handleRemoveFile}>Remove</button>
	  </div>
    
  )}
</CSVReader><button onClick={this.handleconfirm}>Confirm</button>

<br/><br/><br/><br/>
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
