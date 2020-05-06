import React from 'react';
import './App.css';
import {Table} from "./Table";

function App() {

  return (
    <div className="App">
      <div className="card border-light mb-3">
        <div className="card-header">Consulta Preanestésica - Ficha Pacientes</div>
        <div className="card-body">
          <div id="doctor_table_filter">Seleccionar Médico </div>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default App;
