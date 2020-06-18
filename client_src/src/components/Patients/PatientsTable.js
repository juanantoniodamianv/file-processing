import React, { Component } from 'react';
import '../../App.css';
import {Table} from "./Table";
import { MDBAlert } from "mdbreact";

class PatientsTable extends Component{
  render(){
    return (
      <div className="App">
        <div className="card border-light mb-3">
          <div className="card-header">Consulta Preanestésica - Ficha Pacientes</div>
          <div className="card-body">
            <Table />
          </div>
          <MDBAlert color="success" className="d-none mdbAlert">
            <span>Alert</span>
          </MDBAlert>
        </div>
      </div>
    )
  }
}

export default PatientsTable;