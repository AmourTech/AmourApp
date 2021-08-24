import logo from './logo.svg';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import './App.css';
import React from 'react'
//create employee component
// Create new Employee
const handleEmployeeAdd = (event) => {
  // Send POST request to 'Emp/add' endpoint
  axios
    .post('http://localhost:4001/Emp/add', {
      Admin : event.Admin,
      email : event.email,
      FirstName : event.FirstName,
      LastName : event.LastName,
      Organisation : 0,
      password : 'Test',
      username : 'Test'

    })
    .then(res => {
      console.log(res.data)

    })
    .catch(error => console.error(`There was an error creating the Employee: ${error}`))
}


const handleEmployeesubmit =(event) => {
  if (event.email.length > 0 && event.FirstName.length > 0 && event.LastName.length > 0)
  handleEmployeeAdd(event)

}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Settings
        </p>
        <p>

          Add Employee:
          <Form onSubmit={handleEmployeesubmit}>
        <InputGroup className="mb=3" >
        <InputGroup.Text >First and Last Name</InputGroup.Text>
        <FormControl id="FirstName" aria-label="First name" placeholder="First Name"/>
        <FormControl id="LastName" aria-label="Last name" placeholder="Last Name"/>
        </InputGroup>
        <InputGroup className="mb=3">
        <InputGroup.Text>Email Address</InputGroup.Text> 
        <FormControl id="email" aira-label="Email" placeholder="Email Address"></FormControl>
        </InputGroup>
        <Form.Check type='checkbox' id='Admin'>
          <Form.Check.input type='checkbox'/>
          <Form.Check.Label>As Admin</Form.Check.Label>
        </Form.Check>
        <Button type="Submit"> Submit
          </Button>
       
      </Form>
        
      </p>


      </header>



    </div>
  );
}

export default App;
