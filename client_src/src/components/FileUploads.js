import React, { Component } from 'react';
import {  MDBContainer, 
          MDBCol, 
          MDBRow, 
          MDBCard,
          MDBCardBody,
          MDBCardText,
          MDBCardFooter } from "mdbreact";
import axios from 'axios';
import '../App.css';
import FileElement from './Files/FileElement';
import ModalPage from './utils/Modal';

class FileUploads extends Component{

  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      isLoaded: null,
      fullName: null,
      documentNumber: null, 
      doctor: null, 
      date: null,
      submitResponse: null
    }
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    this.getLastRecordOnSpreadsheets();
  }

  getLastRecordOnSpreadsheets = async () => {
    let lastRecord = await axios.get('api/Spreadsheets/getLastRegister');
    this.setState({
      isLoaded: true,
      fullName: lastRecord.data.response.apellido_y_nombre,
      documentNumber: lastRecord.data.response.numero_de_documento, 
      doctor: lastRecord.data.response.medico_anestesista, 
      date: lastRecord.data.response.fecha_de_consulta.replace(/\//g,'-')
    });
  }

  onChangeHandler = event => {
    var files = event.target.files;
    if (this.maxSelectFile(event) && this.checkMimeType(event) && this.maxFileSize(event)) {
      if (!this.state.selectedFile) {
        this.setState({
          selectedFile: files
        })
      } else {
        this.setState({selectedFile: [ ...this.state.selectedFile, ...files]});
      }
    }
  }

  deleteFile = (fileName) => {
    const filteredFileList = [...this.state.selectedFile].filter(file => file.name !== fileName)
    this.setState({
      selectedFile: filteredFileList
    });
  }

  onClickHandler = async () => {
    if (!this.state.selectedFile || !this.state.selectedFile.length) {
      this.formatNotValidAlert("Debe seleccionar al menos una imágen.");
      return;
    }

    let submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;
    submitButton.innerHTML = `Cargando imágenes <div class="spinner-border spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div>`;
    
    const data = new FormData();

    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append('file', this.state.selectedFile[x]);
    }
    
    let response = await axios.post(`api/FileUploads/file-upload?fullName=${this.state.fullName}&documentNumber=${this.state.documentNumber}&doctor=${this.state.doctor}&date=${this.state.date}`, data, {});
    if (response.status === 200) {
      this.setState({
        submitResponse: true
      })
    } else {
      this.setState({
        submitResponse: false
      })
    }
  }

  maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 10) {
      const msg = 'Solo puede subir 10 imágenes';
      event.target.value = null;
      console.log(msg);
      this.formatNotValidAlert(msg);
      return false;
    }
    return true;
  }

  checkMimeType = (event) => {
    let files = event.target.files;
    let err = '';
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    for (let x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err += `${files[x].type} no es un formato válido.`;
      }
    }
    if (err !== '') {
      event.target.value = null;
      console.log(err);
      this.formatNotValidAlert("El formato de imágen no es válido. Formatos válidos (png, jpg, jpeg)");
      return false;
    }
    return true;
  }

  maxFileSize = (event) => {
    let files = event.target.files;
    let err = '';
    let maxSize = 5000000;
    for (let x = 0; x < files.length; x++) {
      if (files[x].size > maxSize) {
        err += `${files[x].name} excede el tamaño permitido (5MB por archivo).`;
      }
    }
    if (err !== '') {
      event.target.value = null;
      console.log(err);
      this.formatNotValidAlert("El tamaño maximo permitido es de 5MB por imágen.");
      return false;
    }
    return true;
  }

  formatNotValidAlert = (msg) => {
    let alert = document.querySelector(".mdbAlert")
    alert.children[0].innerHTML = msg;
    alert.classList.remove('d-none');
    setTimeout(() => { alert.classList.add('d-none') }, 4000);
  }
 
  render(){
    let { error, isLoaded, submitResponse, selectedFile } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>Cargando...
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else if (submitResponse !== null) {
      if (submitResponse) {
        return <ModalPage />;
      } else {
        return <div>Ha ocurrido un error al procesar el formulario</div>;
      }
    } else {
      return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form method="post" action="#">
                <p className="h4 text-center mt-4">Adjuntar Estudios En Ficha Pacientes </p>
                <p className="h6 text-center mb-4">Aqui debe adjuntar los estudios de su último laboratorio (que contenga hemograma y coagulograma) y electrocardiograma completo con valoración.</p>
                <label htmlFor="defaultFormRegister1" className="grey-text">
                  Apellido y nombre
                </label>
                <input type="text" id="defaultFormRegister1" name="fullName" className="form-control" defaultValue={this.state.fullName} disabled/>
                <br />
                <label htmlFor="defaultFormRegister2" className="grey-text">
                  Nro de documento
                </label>
                <input type="text" id="defaultFormRegister2" name="documentNumber" className="form-control" defaultValue={this.state.documentNumber} disabled/>
                <br />
                <label htmlFor="defaultFormRegister3" className="grey-text">
                  Médico anestesísta
                </label>
                <input type="text" id="defaultFormRegister3" name="doctor" className="form-control" defaultValue={this.state.doctor} disabled/>
                <br />
                <label htmlFor="defaultFormRegister4" className="grey-text">
                  Fecha de consulta
                </label>
                <input type="text" id="defaultFormRegister4" name="date" className="form-control" defaultValue={this.state.date} disabled/>
                <br />

                <MDBCard>
                  <MDBCardBody>
                    <MDBCardText>
                      <label className="inputFileLabel">
			                  <input type="file" name="file" onChange={this.onChangeHandler} multiple />Cargar estudios
                      </label>
		                  <ul id="filesList">
                        {selectedFile &&  Array.from(selectedFile).map(file => {
                          return <FileElement fileName={file.name} onClick={this.deleteFile.bind(this, file.name)}/>
                        })}
                      </ul>
                    </MDBCardText>
                  </MDBCardBody>
                  <MDBCardFooter small muted id="footerUploads">
                    Únicamente imágenes (PNG, JPG y JPEG)<br />
                    Máximo 10 imágenes<br />
                    Tamaño máximo por imágen 5MB
                  </MDBCardFooter>
                </MDBCard>
                <br />
                
                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler} id="submitButton">Subir estudios</button> 
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )
    }
  }
}

export default FileUploads;