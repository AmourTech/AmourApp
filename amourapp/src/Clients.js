import logo from './logo.svg';
import './App.css';
import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import FetchClients from './FetchClients'


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    sessionStorage.setItem("valueS", event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Industry  :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

function Clients() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Clients
        </p>
        {/* <p>

Add Client:
<InputGroup className="mb=3" >
<InputGroup.Text >Clients Details</InputGroup.Text>
<FormControl id="Name" aria-label="name" placeholder="Name"/>

<FormControl id="ABN" aria-label="ABN" placeholder="ABN"/>
<FormControl id="ACN" aria-label="ACN" placeholder="ACN"/>
<FormControl id="Clients Address" aria-label="Clients Address" placeholder="Clients Address"/>
</InputGroup>
<InputGroup className="mb=3" >
<FormControl id="BSB Account Number" aria-label="BSB Account Number" placeholder="BSB Account Number"/>
<FormControl id="BSB Name" aria-label="BSB Name" placeholder="BSB Name"/>
<FormControl id="Contact" aria-label="Contact" placeholder="Contact"/>
<FormControl id="TFN" aria-label="TFN" placeholder="TFN"/>
</InputGroup>

<Button variant="dark"> add Client </Button>
</p> */}

<p>
        {/* <NameForm /> */}
        <FetchClients />
</p>
      </header>
    </div>
  );
}

export default Clients;
