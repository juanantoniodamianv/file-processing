import React, { Component } from 'react';
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import axios from 'axios';

//const queryString = require('query-string');


class FileUploads extends Component{

  constructor(props) {
    super(props);
    //const parsed = queryString.parse(this.props.location.search);
    //const { fullName, documentNumber, doctor, date } = parsed;
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
    let lastRecord = await axios.get('http://localhost:3000/api/Spreadsheets/getLastRegister');
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
      this.setState({
        selectedFile: files,
        loaded: 0
      })

      switch (files.length) {
        case 1:
          document.getElementById('fileNamePlaceholder').innerText = files[0].name;
          document.getElementById('submitButton').disabled = false;
          break;
        case 0:
          document.getElementById('fileNamePlaceholder').innerText = '';
          document.getElementById('submitButton').disabled = true;
          break;
        default:
          document.getElementById('fileNamePlaceholder').innerText = `${files.length} imágenes seleccionadas`;
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

    let response = await axios.post(`http://localhost:3000/api/FileUploads/file-upload?fullName=${this.state.fullName}&documentNumber=${this.state.documentNumber}&doctor=${this.state.doctor}&date=${this.state.date}`, data, {});
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
    if (files.length > 5) {
      const msg = 'Solo puede subir 5 imágenes';
      event.target.value = null;
      console.log(msg);
      return false;
    }
    return true;
  }

  checkMimeType = (event) => {
    let files = event.target.files;
    let err = '';
    const types = ['image/png', 'image/jpeg'];
    for (let x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err += `${files[x].type} no es un formato válido.`;
      }
    }
    if (err !== '') {
      event.target.value = null;
      console.log(err);
      return false;
    }
    return true;
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
                
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon01">
                      Añadir archivo
                    </span>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      multiple
                      onChange={this.onChangeHandler}
                      required
                    />
                    <label className="custom-file-label" id="fileNamePlaceholder" htmlFor="inputGroupFile01">
                    </label>
                  </div>
                </div>
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