import logo from './logo.svg';
import './App.css';
import { Table, Button } from 'reactstrap';
import { useState, useEffect } from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css"

function fetchClient() {
  const url = "http://localhost:4001/api/clients"

  return fetch(url)
    .then(res => res.json())
    .then((json) => {
      console.log(json);
    });
}


function ClientTable({ Clients }) {
  // const [rowData, setRowData] = useState([]);

  // const columns = [

  //   { headerName: "Client Name", field: "name"},
  //   // { headerName: "Client Name", field: "name"},
  //   // { headerName: "Client Name", field: "name"},
  // ];

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/clients")
  //   .then(res => res.json())
  //   .then(data=> data.works)
  //   .then(works =>
  //     works.map(client => {
  //       return {
  //         name: client.name
  //       };
  //     }))
  //     .then(clients => setRowData(clients))
  // }, []);

  return (
    
    <Table dark>
      <thead>
        <tr>
          <th>Client Name</th>
          {/* <th>Symbol</th>
          <th>Industry</th> */}
        </tr>
      </thead>
      <tbody>
        {Clients.map(client => {
          return (
            <tr key={client[0].clientname}>
              <td>{client[0].clientname}</td>
              {/* <td>{Client.symbol}</td>
              <td>{Client.industry}</td> */}
            </tr>
          );
        })}
      </tbody>
    </Table>

    // <div
    //   className="ag-theme-balham-dark"
    //   style= {{
    //     height: "300px",
    //     width: "600px"
    //   }} 
    // >

    // <AgGridReact
    // columnDefs={columns}
    // rowData={rowData}
    // />

    // </div>
  );
}

export default function FetchClients() {
  const [Clients, setClients] = useState([]);
  return (
    <div className="App">
      <h3>
        Client List &nbsp;
        <Button
          onClick={() => {
            fetchClient().then(Clients => {
              setClients(Clients);
            });
          }}
        >
          Show Clients/Submit Condition
        </Button>
      </h3>
      <ClientTable Clients={Clients} />
    </div>
  );
}
