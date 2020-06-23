import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {

render() {
  return (
    <MDBContainer>
      <MDBModal keyboard={false} isOpen={true} size="lg">
        <MDBModalHeader>Sus estudios se han cargado correctamente</MDBModalHeader>
        <MDBModalBody>
          <p>Indicaciones para el día de la cirugía:</p>
          <ul>
            <li>8 hs de ayuno (nada de sólidos ni líquidos).</li>
            <li>El día previo tomar la medicación habitual (NO ASPIRINAS).</li>
            <li>Quitarse la prótesis dental antes de ir a quirofano.</li>
            <li>No ir a quirofano con uñas pintadas.</li>
          </ul>
        </MDBModalBody>
        <MDBModalFooter>
          <p>Ahora puede cerrar este sitio</p>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalPage;