import './App.css';
import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Home from './Home'
import Clients from './Clients'
import Proposals from './Proposals'
import Services from './Services'
import Library from './Library'
import Settings from './Settings'
import { Nav, Navbar, Form, FormControl, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <div className="App1">
      <aside1>
    <Navbar expand="lg">
      <Navbar.Brand>Organisation</Navbar.Brand>
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Username
      </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/Settings">Settings</Dropdown.Item>
          <Dropdown.Item href="#/Logout">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Navbar.Collapse id="basic-navbar-nav">
        {/* <Nav className="ml-auto">
          <Nav.Item>Username</Nav.Item>
        </Nav> */}
      </Navbar.Collapse>
    </Navbar>

    
    </aside1>

    <Router>
        <aside>
          <ProSidebar>
            <Menu>
              <MenuItem><img src={logo} className="App-logo" alt="logo" /></MenuItem>
              <MenuItem><Link to={'/'}>Dashboard</Link></MenuItem>
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
          <Route exact path="/" component={Home} />
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
export default App;
