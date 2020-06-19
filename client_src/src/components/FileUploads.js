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
    if (this.maxSelectFile(event) && this.checkMimeType(event)) {
      let filesList = document.getElementById('filesList');
      
      filesList.innerHTML = '';
      for (const file of files) {
        filesList.innerHTML += `<li>${file.name}</li>`;
      }

      this.setState({
        selectedFile: files
      })

      switch (files.length) {
        case 1:
          document.getElementById('submitButton').disabled = false;
          break;
        case 0:
          document.getElementById('submitButton').disabled = true;
          break;
        default:
          document.getElementById('submitButton').disabled = false;
          break;
      }

    }
  }

  onClickHandler = async () => {
    let submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;
    submitButton.innerHTML = `Cargando imágenes <div class="spinner-border spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div>`;
    
    const data = new FormData();

    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append('file', this.state.selectedFile[x]);
    }
    const config = { headers: { 'Enctype': 'multipart/form-data', 'Content-Type': '' } };
    let response = await axios.post(`api/FileUploads/file-upload?fullName=${this.state.fullName}&documentNumber=${this.state.documentNumber}&doctor=${this.state.doctor}&date=${this.state.date}`, data, config);
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

  formatNotValidAlert = (msg) => {
    let alert = document.querySelector(".mdbAlert")
    alert.children[0].innerHTML = msg;
    alert.classList.remove('d-none');
    setTimeout(() => { alert.classList.add('d-none') }, 4000);
  }
 

  render(){
    const { error, isLoaded, submitResponse } = this.state;
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
        return <div>Se han subido correctamente las imágenes</div>;
      } else {
        return <div>Ha ocurrido un error al procesar el formulario</div>;
      }
    } else {
      return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form method="post" action="#">
                <p className="h4 text-center mb-4">Adjuntar Imágenes en Ficha Pacientes </p>
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
			                  <input type="file" name="file" onChange={this.onChangeHandler} multiple />Cargar imágenes
                      </label>
		                  <ul id="filesList"></ul>
                    </MDBCardText>
                  </MDBCardBody>
                  <MDBCardFooter small muted id="footerUploads">
                    Únicamente PNG, JPG y JPEG.<br />
                    Máximo 10 imágenes
                  </MDBCardFooter>
                </MDBCard>
                <br />
                
                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler} id="submitButton">Subir Imágenes</button> 
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )
    }
  }
}

export default FileUploads;