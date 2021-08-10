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
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';



function App() {

  return (
    <div className="App1">
    <Navbar expand="lg">
    <Navbar.Brand><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
      <Navbar.Brand>Username</Navbar.Brand>
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form>
      <Navbar.Collapse id="basic-navbar-nav">
        {/* <Nav className="ml-auto">
          <Nav.Item>Username</Nav.Item>
        </Nav> */}
      </Navbar.Collapse>
    </Navbar>

    <Router>
      <div className="App">
        <aside>
          <ProSidebar>
            <Menu>
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
      </div>
    </Router>
    </div>


  );
}
export default App;
