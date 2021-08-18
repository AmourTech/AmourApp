import logo from '';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
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
          <Form>
        <InputGroup className="mb=3" >
        <InputGroup.Text >First and Last Name</InputGroup.Text>
        <FormControl id="Fname" aria-label="First name" placeholder="First Name"/>
        <FormControl id="Lname" aria-label="Last name" placeholder="Last Name"/>
        </InputGroup>
        <InputGroup className="mb=3">
        <InputGroup.Text>Email Address</InputGroup.Text> 
        <FormControl id="Email" aira-label="Email" placeholder="Email Address"></FormControl>
        </InputGroup>
        <Form.Check type='checkbox' id='asAdmin'>
          <Form.Check.input type='checkbox'/>
          <Form.Check.Label>As Admin</Form.Check.Label>
        </Form.Check>
        <Button variant="dark" type="submit"> add employee </Button>
        </Form>
        
        </p>


      </header>



    </div>
  );
}

export default App;
