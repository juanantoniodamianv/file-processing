import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FileUploads from './FileUploads';
import PatientsTable from './Patients/PatientsTable';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={PatientsTable}  />
      <Route exact path='/file-uploads' component={FileUploads}  />
    </Switch>
  </main>
)

export default Main;