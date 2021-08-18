import logo from './logo.svg';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Settings
        </p>
        <p>

          Add Employee:
        <InputGroup className="mb=3" >
        <InputGroup.Text >First and Last Name</InputGroup.Text>
        <FormControl id="Fname" aria-label="First name" placeholder="First Name"/>
        <FormControl id="Lname" aria-label="Last name" placeholder="Last Name"/>
        </InputGroup>
        <InputGroup className="mb=3">
        <InputGroup.Text>Email Address</InputGroup.Text> 
        <FormControl id="Email" aira-label="Email" placeholder="Email Address"></FormControl>
        </InputGroup>
        <Button variant="dark"> add employee </Button>
        </p>


      </header>



    </div>
  );
}

export default App;
