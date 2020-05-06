import React, {Component} from 'react';
import axios from 'axios';
const $ = require('jquery');
$.DataTable = require('datatables.net-responsive');

const columns = [
  { 
    title: 'Fecha',
    searchable: false,
    orderable: true
  },
  { 
    title: 'Apellido y Nombre',
    searchable: true,
    orderable: true
  },
  { 
    title: 'N° de Documento',
    searchable: true,
    orderable: true
  },
  { 
    title: 'Obra Social',
    searchable: false,
    orderable: true
  },
  { 
    title: 'N° de Afiliado',
    searchable: false,
    orderable: true
  },
  { 
    title: 'Médico Anestesista',
    searchable: false,
    orderable: true
  },
  {
    title: '',
    searchable: false,
    orderable: false,
    responsivePriority: 1
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
    let data = this.state.items.map(({fecha, apellido_y_nombre, numero_de_documento, obra_social, numero_de_afiliado, medico_anestesista, form_response_edit_url, form_response_edit_url_m}) =>
      [ fecha, 
        apellido_y_nombre, 
        numero_de_documento, 
        obra_social, 
        numero_de_afiliado, 
        medico_anestesista, 
        ` ${this.linkActions(form_response_edit_url, 'Formulario Paciente')}
          ${this.linkActions(form_response_edit_url_m, 'Formulario Medico')}`]
    )
    this.$el = $(this.el)
    this.$el.DataTable({
      searchPanes:{
        cascadePanes: true
      },
      dom: '<"data-table-wrapper"ft>',
      data,
      columns,
      ordering: true,
      responsive: true,
      language: {
        search: 'Buscar Paciente'
      }
    })
  }

  linkActions = (url, title) => {
    return url ? `<a href="${url}" class="btn btn-sm btn-primary btn-block" target="_blank">${title}</a>` : ''
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
      return <table data-order='[[ 0, "desc" ]]' className="table table-striped table-bordered dt-responsive nowrap" style={{width:'100%'}} ref={ el => this.el= el }></table>;
    }
  }
}