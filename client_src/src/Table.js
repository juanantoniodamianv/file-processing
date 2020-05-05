import React, {Component} from 'react';
import axios from 'axios';
const $ = require('jquery');
$.DataTable = require('datatables.net-responsive');

const columns = [
  { 
    title: 'Fecha',
  },
  { 
    title: 'Apellido y Nombre',
  },
  { 
    title: 'N° de Documento',
  },
  { 
    title: 'Obra Social',
  },
  { 
    title: 'N° de Afiliado',
  },
  { 
    title: 'Médico Anestesista',
  },
  {
    title: ''
  }
];

export class Table extends Component { 

  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  
  componentDidMount() {
    this.getRegisters();
  }
  
  componentWillUnmount(){
    $('.data-table-wrapper')
      .find('table')
      .DataTable()
      .destroy(true);
  }

  componentDidUpdate(){
    let data = this.state.items.map(({marca_temporal, apellido_y_nombre, numero_de_documento, obra_social, numero_de_afiliado, medico_anestesista, form_response_edit_url}) =>
      [marca_temporal, apellido_y_nombre, numero_de_documento, obra_social, numero_de_afiliado, medico_anestesista, `<a href="${form_response_edit_url}" target="_blank">Ver Formulario</a>`]
    )
    this.$el = $(this.el)
    this.$el.DataTable({
      searchPanes:{
        cascadePanes: true
      },
      dom: '<"data-table-wrapper"ft>',
      data,
      columns,
      ordering: false,
      responsive: true,
      language: {
        search: 'Buscar'
      }
    })
  }

  getRegisters = async () => {
    try {
      let items = await axios.get('/api/Spreadsheets')
      this.setState({ 
        isLoaded: true,
        items: items.data.response
      })
    } catch (error) {
      this.setState({ 
        isLoaded: true,
        error
      })
    }
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
      return <table className="table table-striped table-bordered dt-responsive nowrap" style={{width:'100%'}} ref={ el => this.el= el }></table>;
    }
  }
}