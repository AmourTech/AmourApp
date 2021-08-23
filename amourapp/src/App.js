import './App.css';
import logo from './logo.svg';
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Home from './Home'
import Clients from './Clients'
import Proposals from './Proposals'
import Services from './Services'
import Library from './Library'
import Settings from './Settings'
import Login from './Login'
import { Nav, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'



class App extends React.Component{

    constructor(props) {
       super(props);
       this.state = {
    	
    			};
    			
		this.out = this.out.bind(this);
     }
  
   
  
    out(){
		localStorage.setItem("user","");
		this.props.history.push('/index');
	}
   
   render() {
	   
	   if(!localStorage.getItem("user")){
	   	   
	   	  
	   	   
	   	 //  this.props.history.push('/index');
	   	   return ( <>Not logged in<Link to={'/index'}> click here to log in</Link></>);
	   	   
	   }
	   
	   console.log(localStorage.getItem("user"))
	   let view  = JSON.parse(localStorage.getItem("user"))[0]
	   console.log(view)
	   
	    let admin = localStorage.getItem("admin")
		let username =''
		if(admin == 1){
			username = view.Fname + view.Lname
		}else{
			username = view.FirstName + view.LastName
		}
	   //console.log(view[2])
  return (
    <div className="App1">
      
    <Navbar expand="lg">
      <Navbar.Brand>Organisation</Navbar.Brand>
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
		
           {username}
      </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/Settings">Settings</Dropdown.Item>
          <Dropdown.Item onClick={() => this.out()} href="#/Logout">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Navbar.Collapse id="basic-navbar-nav">
        {/* <Nav className="ml-auto">
          <Nav.Item>Username</Nav.Item>
        </Nav> */}0
      </Navbar.Collapse>
    </Navbar>

    
    

    <Router>
        <aside>
          <ProSidebar>
            <Menu>
              <MenuItem><img src={logo} className="App-logo" alt="logo" /></MenuItem>
              <MenuItem><Link to={'/Home'}>Dashboard</Link></MenuItem>
              <MenuItem><Link to={'/Clients'}>Clients</Link></MenuItem>
              {/* <SubMenu title="Proposals">
                <MenuItem><Link to={'/Proposals'}>Create a new proposal</Link></MenuItem>
                <MenuItem>Export Proposals</MenuItem>
                <MenuItem>Import Proposals</MenuItem>
                <MenuItem>View Proposals</MenuItem>
              </SubMenu> */}
              <MenuItem><Link to={'/Proposals'}>Proposals</Link></MenuItem>
              <MenuItem><Link to={'/Services'}>Services</Link></MenuItem>
              <MenuItem><Link to={'/Library'}>Library</Link></MenuItem>
              <MenuItem><Link to={'/Settings'}>Settings</Link></MenuItem>
            </Menu>
          </ProSidebar>
        </aside>

        <main>

          <Route  path="/Home" component={Home} />
          <Route path="/Clients" component={Clients} />
          <Route path="/Proposals" component={Proposals} />
          <Route path="/Services" component={Services} />
          <Route path="/Library" component={Library} />
          <Route path="/Settings" component={Settings} />
        </main>
    </Router>
    </div>


  );
  }
}
export default App;
