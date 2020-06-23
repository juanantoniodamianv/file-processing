import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ImagesModal extends Component {
  constructor(props, context){
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
        show: false
    }
  }

  handleShow() {
      this.setState({ show: true })
  }

  handleClose(){
      this.setState({ show: false })
  }

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.state.show} fullHeight position="bottom">
          <MDBModalHeader>Estudios adjuntos</MDBModalHeader>
          <MDBModalBody>
            
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.handleClose}>Cerrar</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      );
    }
}

export default ImagesModal;