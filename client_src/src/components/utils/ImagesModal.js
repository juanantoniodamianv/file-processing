import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';

class ImagesModal extends Component {
  constructor(props, context){
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
        show: false,
        fileUrls: {}
    }
  }

  handleShow(fileUrls) {
      this.setState({ 
        show: true,
        fileUrls 
      })
  }

  handleClose(){
      this.setState({ 
        show: false,
        fileUrls: {}
      })
  }

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.state.show} size="lg" position="bottom">
          <MDBModalHeader>Estudios adjuntos</MDBModalHeader>
          <MDBModalBody>
            {this.state.fileUrls.length ? this.state.fileUrls.map(file => {
              return (
                <MDBRow className="mb-4">
                  <MDBCol md="12">
                    <div class="aspect-ratio-box">
                      <img src={file.url} className="img-fluid" alt="" />
                    </div>
                  </MDBCol>
                </MDBRow>
              )
            })
            : <p>El paciente no ha cargado ningun estudio</p>
            }

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