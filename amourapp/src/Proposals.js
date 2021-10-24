/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import ReactFileReader from 'react-file-reader';
import { Multiselect } from 'multiselect-react-dropdown';
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
//init("user_rWil2YAmTwqksmYOlnout");

const buttonRef = React.createRef();
// const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];
//     list[index][name] = value;
//     setInputList(list);
//   };
 
//   // handle click event of the Remove button
//   const handleRemoveClick = index => {
//     const list = [...inputList];
//     list.splice(index, 1);
//     setInputList(list);
//   };
 
//   // handle click event of the Add button
//   const handleAddClick = () => {
//     setInputList([...inputList, { firstName: "", lastName: "" }]);
//   };
 
class App extends React.Component{
	
	 constructor(props) {

		super(props);
	    this.state = {
			 serviceSend:JSON,
			   st :1,
			   options:[],
			   viewdata:[],
			   viewdata1:[],
			   viewdata2:[],
			    clients:[],
					terms:[],
				serviceData:[],
				contactemail:'',
			   name:"", 
			  client:"", 
			  contact:"",
			  sdate:"", 
			  followdate:"",
			  edate:"", 
			  clen:"12 Month", 
			  message:"", 
			  acc:"Pending", 
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
				expiry:'',
				contactid:'',
			  importer:[{}],
			};
			
			this.sub = this.sub.bind(this);
			this.sendemail = this.sendemail.bind(this);
			this.setShow = this.setShow.bind(this);
			this.setShow1 = this.setShow1.bind(this);
			this.setShow2 = this.setShow2.bind(this);
			this.setShow3 = this.setShow3.bind(this);
			this.setMenu = this.setMenu.bind(this);
			this.delete = this.delete.bind(this);
			this.duplicate = this.duplicate.bind(this);
			this.handleOnFileLoad = this.handleOnFileLoad.bind(this);
			this.handleOnRemoveFile = this.handleOnRemoveFile.bind(this);
			this.handleconfirm = this.handleconfirm.bind(this);
			this.getClient = this.getClient.bind(this);
			this.getService = this.getService.bind(this);
			this.multiselectRef = React.createRef();
	  }

	  componentDidMount() {
	      this.getList()
		  this.setMenu(1)			
	   }
	   handleOpenDialog = (e) => {
		if (buttonRef.current) {
		  buttonRef.current.open(e);
		}
	  };
	  resetValues() {
		// By calling the belowe method will reset the selected values programatically
		this.multiselectRef.current.resetSelectedValues();
	  }
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
	  getService(){
		let view  = JSON.parse(localStorage.getItem("user"))[0]
		axios.get(this.$url+'/users/getservo?id='+view.Organisation,null)
		.then(res=>{
					var item = (res.data)
					console.log(item)		 
					this.setState({serviceData:res.data})
					let options =
					this.state.serviceData.map((item, index) =>
					
						
							{return {id: item.ID, key: item.Sname}}
						
					);
					console.log(options)
					this.setState({options:options})
					console.log(this.state.options)
		})
		.catch(err => {
			console.log(err);
		 })


	 }
async	getClient(){
		let view  = JSON.parse(localStorage.getItem("user"))[0]
await		axios.get(this.$url+'/users/getcl?id='+view.Organisation,null)
			.then(res => 
				{
					console.log(res.data)
					this.setState({clients: res.data});	
					console.log(this.state.clients)

					
				}
			)
				
			.catch(err =>
				{
				console.log(err);
				}	
			)
			 
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
	
	getTerm(){
		let view  = JSON.parse(localStorage.getItem("user"))[0];
		var id = view.Organisation;
		axios.get(this.$url+'/users/getterm?id='+id,null)
		.then(res=>{
					var item = (res.data)
					console.log(item)		 
					this.setState({terms:res.data})
		})
		.catch(err => {
			console.log(err);
		 })


	 }

async	checkboxes(){
		var test =this.multiselectRef.current.getSelectedItems()
	console.log(test)

		await this.setState({serviceSend:JSON.stringify(test)})

		console.log(this.state.serviceSend)

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
	
		axios.post(this.$url+'/users/updatepro',data)
			.then(res => {
					 
					 
					 if(res.data===1){
						 
						 alert("Updated successfully!")
						 
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
						 
						 
			if(res.data===1){
				
			   this.getList();
				
			}else{
				
				
			}
			
	
	})
}
duplicateadd(data){
	axios.post(this.$url+'/users/add',data)
	.then(res => {
					 
					 
		if(res.data===1){
			
			alert("Successful operation!")
			
		   this.getList();
			
		}else{
			
			
		}
		

})
		
	}
	
async	setMenu(num){
		this.getService();
await		  this.getClient();
		   this.getList();
			 this.getTerm();
		  this.setState({st: num});
	}
	
	setShow(flag){
		 
		  this.setState({show: flag});
	}
	
	setShow1(flag,mes){
		 
		  this.setState({show1: flag,mes:mes});
	}


setShow3(flag, TName, TDesc, Terms, Tid){
		 
	this.setState({show3: flag, TName:TName, TDesc:TDesc,Terms:Terms,Tid:Tid});
}
	setShow2(flag,mes, na, sda, eda, services, cont, cle, ac, id){
		 console.log(services)
		this.setState({show1: flag,na:na, mes:mes, sda:sda, eda:eda, serviceSend:services, cont:cont, cle:cle, ac:ac, id:id});
}
	
	acc(id,value){
		
		let data= {
			id:id,
			acc:value
		}
		if (window.confirm("confirm "+ value +"?")) {
		axios.post(this.$url+'/users/acc',data)
		  .then(res => {
						 
						 
						 if(res.data===1){
							 
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
async	 sub(){
		await this.checkboxes()
		 console.log(localStorage.getItem("user"))
		 let view  = JSON.parse(localStorage.getItem("user"))[0]
		 this.setState({userid: view.UserID})
		 var data  = this.state
		axios.get(this.$url+'/users/getcont?id='+data.client,null).then(
			res=>{
				data['contactid'] = res.data[0].Contact


		
			data['userid'] = view.UserID
			axios.post(this.$url+'/users/add',data)
				.then(res => {
					
					
					if(res.data===1){
						
						alert("Proposal sent successfully!")
						
						this.setShow(false)
						
					}else{
						
						
					}
					
				
				})
				.catch(err => {
					console.log(err);
				})
			
			})
		console.log(this.state)
		
	}

	sendemail(id, contactid){
			
			axios.get(this.$url+'/users/findcont?id='+contactid)
			.then(res => {

				this.setState({contactemail: res.data[0].Email});				
				console.log(this.state.contactemail)
				// console.log(localStorage.getItem("user"))
				let view  = JSON.parse(localStorage.getItem("user"))[0]
				// this.state.userid = view.UserID
				//data['userid'] = view.UserID
					axios.post(this.$url+'/users/customerportal?id='+id, {email: this.state.contactemail})
						.then(res => {	
						if(res.data===1){
							alert("email sent successfully!")	
							this.setShow(false)		
						}else{				
						}			 
						})
						.catch(err => {
							 console.log(err);
						})
			 console.log(this.state)
			})
				.catch(err => {
					 console.log(err);
				})

	}
	  render() {
		  
		console.log('startup');
		let admin  = JSON.parse(localStorage.getItem("admin"))[0]
		 console.log(admin);
		  
		  if(admin === 1){
		 	return (  <>
		 	<div className="App">

		 	  <header className="App-header1">
		 	   
		 		when client accepts they pay with stripe before signing
		 		<div className="body">
		 		 		
		 		
		 		 <table className="table">
		 		  
		 		  <tr className="table-tr">
		 		    <td>Proposal Name</td>
		 		    <td>Client</td>
		 		    <td>Contact</td>
		 		 	<td>Start Date</td>
		 		 	<td>Start Date</td>
		 		 	<td>Minimun Contract Length</td>
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

		 		 					   <td >{item.acc === 0 ?  'Pending' : item.acc}</td>
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

		   if (isisd === 1) {
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
							   return  <option value={item.AccountID} >{item.clientname}</option>
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
			 					    <Form.Label>Services</Form.Label>

									
									<Multiselect
									options={this.state.options}
									displayValue="key"
									showCheckbox={true}
									closeOnSelect={false}
									ref={this.multiselectRef}
									placeholder="Services"
									avoidHighlightFirstOption={true}
									style={{
									  chips: {
										background: 'black'
									  },
									  multiselectContainer: {
										color: 'black',
										background:'white'
									  },
									  searchBox: {
										border: 'none',
										'border-bottom': '1px solid blue',
										'border-radius': '0px'
									  }
									}}
									/>
			 					  	  
									
			 					   

	
			 					  
			 					  </Form.Group>
			 								      
			 					  <Form.Group md="3" as={Col} controlId="formGridPassword">
			 					    <Form.Label>Effective Start Date</Form.Label>
			 					   <Form.Control  type="date" value={this.state.sdate}
									onChange={e => this.setState({ sdate: e.target.value })}  placeholder="Choose..." />
			 					  </Form.Group>
			 					</Row>
			 					
			 <Row className="mb-3">
			   {/* <Form.Group md="3"  as={Col} controlId="formGridAddress1">
			     <Form.Label>Effective end Date</Form.Label>
			     <Form.Control  type="date" value={this.state.followdate}
			          onChange={e => this.setState({ edate: e.target.value })}  placeholder="Choose..." />
			   </Form.Group> */}

				 <Form.Group md="3"  as={Col} controlId="formGridAddress1">
					<Form.Label>Terms</Form.Label>
					<Form.Select value={this.state.TName}
						onChange={e => this.setState({ TName: e.target.value })} defaultValue="Choose...">
						<option value="">Choose...</option>
						{
							this.state.terms.map((item, index) => {
								return <option value={item.Organisation} >{item.TermName}</option>
							})
						}
					</Form.Select>
				</Form.Group>

				<Form.Group md="3"  as={Col} controlId="formGridAddress2">
			     <Form.Label>Minimum Contract Length</Form.Label>
			     <Form.Select value={this.state.clen}
			          onChange={e => this.setState({ clen: e.target.value })}  defaultValue="Choose...">
			       <option value="12">12 Months</option>
			       <option value="6">6 Months</option>
			 	  <option value="3">3 Months</option>
			     </Form.Select>
			   </Form.Group>
			 </Row>

			   
			   <Button className="me-2" onClick={() => this.setShow(true)}>
			     Next
			   
			   </Button>
			   <Button className="me-2" onClick={() => this.checkboxes()}>
			     check
			   
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
			   {/* <td>Client</td> */}
			   <td>Contact</td>
				<td>Start Date</td>
				<td>End Date</td>
				<td>Minimun Contract Length</td>
				<td>Service Data</td>
				<td>Proposal status</td>
				{/* <td>Offer expires in...</td> */}
				<td>operate</td>
			 </tr>
			 
			{
			                   this.state.viewdata.map((item, index) => {
			                       return <tr>
								   <td >{item.name}</td>
								   {/* <td >{item.client}</td> */}
								   <td >{item.contact}</td>
								   <td >{item.sdate}</td>
								   <td >{item.edate}</td>
								   <td >{item.clen}</td>
								   <td >{item.services}</td>
								   <td >{item.acc === 0 ?  'Pending' : item.acc}</td>
									 {/* <td >{item.expiry}</td> */}
								   <td ><a href="javascript:;" onClick={() => this.delete(item.id)}>delete</a><a onClick={() => this.setShow2(true,item.message,item.name, item.sdate, item.edate, item.services, 
										item.contact, item.clen, item.acc, item.id)} href="javascript:;" >edit</a><a href="javascript:;" onClick={() => this.duplicate(item.id)}>duplicate</a> 
										<a href="javascript:;" onClick={() => this.sendemail(item.id, item.contact)}>send</a>								
										</td>
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
						<Form.Label>Edit Proposal Information</Form.Label>
								  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							
							
							<Form.Label>Proposal Name</Form.Label>
							<Form.Control value={this.state.na}
		          onChange={e => this.setState({ na: e.target.value })} type="text" placeholder="" />
							<Form.Label>Start Date</Form.Label>
							<Form.Control value={this.state.sda}
		          onChange={e => this.setState({ sda: e.target.value })} type="date" placeholder="" />
							{/* <Form.Label>End Date</Form.Label>
							<Form.Control value={this.state.eda}
		          onChange={e => this.setState({ edate: e.target.value })} type="date" placeholder="" /> */}
							<Form.Label>Contract Length</Form.Label>
							<Form.Select value={this.state.cle}
			          onChange={e => this.setState({ cle: e.target.value })}  defaultValue="Choose...">
			       		<option value="12">12 Months</option>
			       		<option value="6">6 Months</option>
			 	  			<option value="3">3 Months</option>
			     </Form.Select>
							<Form.Label>Message</Form.Label>
							<Form.Control value={this.state.mes}
		          onChange={e => this.setState({ mes: e.target.value })} type="text" placeholder="" />
							<Form.Label>Status</Form.Label>
							<Form.Control value={this.state.ac}
		          onChange={e => this.setState({ ac: e.target.value })} type="text" placeholder="" />
							<Form.Label>Contact Details</Form.Label>
							<Form.Control value={this.state.cont}
		          onChange={e => this.setState({ cont: e.target.value })} type="text" placeholder="" />
							<Form.Label>Terms</Form.Label>
							<Form.Select value={this.state.TName}
								onChange={e => this.setState({ TName: e.target.value })} defaultValue="Choose...">
								<option value="">Choose...</option> {
								this.state.terms.map((item, index) => {
									return <option value={item.Organisation} >{item.TermName}</option>
								})}
							</Form.Select>
							<Form.Label>Services Provided</Form.Label>
							<Form.Control value={this.state.serviceSend}
		          onChange={e => this.setState({ serviceSend: e.target.value })} type="text" placeholder="" />
							</Form.Group>
							
							<Button className="me-2" onClick={() => this.update()}>
					    Update
					  
					  </Button>
						</Form>
						
					</Modal.Body>
		</Modal>
		

		{/* {view}

		<Modal show={this.state.show2} fullscreen={true} onHide={() => this.setShow2(false,'')}>
		  <Modal.Header closeButton>
		    <Modal.Title>Send proposal to client</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
						<Form>
						<Form.Label>Select email to send to</Form.Label>
								  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							
							
							<Form.Label>Email</Form.Label>
							<Form.Control value={this.state.email}
		          onChange={e => this.setState({ email: e.target.value })} type="text" placeholder="" />

						</Form.Group>

						
						
						<Button className="me-2" onClick={() => send("default_service", "template_ej8r9p5", this.templateParams)
      			.then(
        			function(response) {
          				console.log("Your message has successfully sent!", {
          				});
          				console.log("SUCCESS!", response.status, response.text);
        			},
        			function(err) {
          			console.log("Your message was not able to be sent");
        			}
      			)}>
					    Send email
					  
					  </Button>
						</Form>
						
					</Modal.Body>
		</Modal> */}


		
		</div>
	  </header>
	</div>
  
		</>
  )};
}

export default App
