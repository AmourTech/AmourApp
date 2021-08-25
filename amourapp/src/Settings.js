import logo from './logo.svg';
import React from 'react';
import './App.css';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';


// create employee component
// Create new Employee
const handleEmployeeAdd = (event) => {
  // Send POST request to 'emp/add' endpoint
  axios.post('http://localhost:8080/emp/add', {
      Admin: event.Admin,
      email : event.email,
      FirstName : event.FirstName,
      LastName : event.LastName,
      Organisation : 2,
      password : 'Test',
      username : 'Test'

    })
    axios.put('http://localhost:8080/emp/del',{
      Organisation : 2,
      UserID : 1
  })
    .then(res => {
      console.log(res.data)

    })
    .catch(error => console.error(`There was an error creating the Employee: ${error}`))
}


const handleEmployeesubmit =(event) => {
        
  if (event.Admin === false)
  {
    event.Admin= 0;
  }
  else {
    event.Admin= 1;
  }
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
        <Form.Check type='checkbox' id='Admin' label="Admin"/>
        <Button type="submit"> Submit </Button>
       
      </Form>
        
      </p>


      </header>



    </div>
  );
}

export default App;
