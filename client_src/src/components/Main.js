import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FileUploads from './FileUploads';
import PatientsTable from './Patients/PatientsTable';
import { MDBAlert } from "mdbreact";

const Main = () => (
  <main>
    <MDBAlert color="warning" className="d-none mdbAlert">
      <span>Alert</span>
    </MDBAlert>
    <Switch>
      <Route exact path='/' component={PatientsTable}  />
      <Route exact path='/file-uploads' component={FileUploads}  />
    </Switch>
  </main>
)

export default Main;