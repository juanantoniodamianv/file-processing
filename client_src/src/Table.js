import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

import 'datatables.net'
import 'datatables.net-responsive'
//import 'datatables.net-searchpanes/js/dataTables.searchPanes'

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
    searchable: true,
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
      dom: '<"data-table-wrapper"ft>',
      data,
      columns,
      ordering: true,
      responsive: true,
      language: {
        search: 'Buscar Paciente',
        zeroRecords: 'No se han encontrado resultados para tu búsqueda'
      },
      initComplete: function () {
        document.getElementById('DataTables_Table_0').style.display = 'none'
        document.getElementById('DataTables_Table_0_filter').style.display = 'none'
        // eslint-disable-next-line
        this.api().columns([5]).every( function () {
            var column = this;
            var select = $('<select><option value="" disabled selected style="display:none;"></option></select>')
                .appendTo('#doctor_table_filter')
                .on('change', function () {
                  var val = $.fn.dataTable.util.escapeRegex($(this).val());
                  column.search( val ? val : '', true, false ).draw();
                  document.getElementById('DataTables_Table_0').style.display = 'table';
                  document.getElementById('DataTables_Table_0_filter').style.display = 'block';
                });
            column.data().unique().sort().each( function ( d, j ) {
                select.append( '<option value="'+d+'">'+d+'</option>' )
            });
        });
      }

    })
  }

  linkActions = (url, title) => {
    return url ? `<a href="${url}" class="btn btn-sm btn-primary btn-block mb-1" target="_blank">${title}</a>` : ''
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

  toClipboard = () => {
    navigator.clipboard.writeText("https://forms.gle/JRKHLXMjQtzLDQvW7");
    
    let el = document.getElementById("btnToClipboard");
    el.title = "URL copiada al portapapeles";
  }

  refreshTooltip = () => {
    let el = document.getElementById("btnToClipboard");
    el.title = "Copiar en el portapapeles la dirección de la pagina para mandar al paciente";
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div>
          <div className="row">
            <div id="doctor_table_filter">Seleccionar Médico </div>
            <button type="button" id="btnToClipboard" className="btn btn-secondary btn-sm mt-0" data-toggle="tooltip" title="Copiar en el portapapeles la dirección de la pagina para mandar al paciente" onMouseOut={this.refreshTooltip.bind(this)} onClick={this.toClipboard.bind(this)}>
              Copiar URL Formulario Paciente
            </button>
            <a href="https://forms.gle/FqMpEQwLaFrX41TG6" class="btn btn-secondary btn-sm mt-0 ml-1" target="_blank" title="Abrir el formulario del médico en otra pestaña del navegador">Formulario del Médico</a>
          </div>
          <table data-order='[[ 0, "desc" ]]' className="table table-striped table-bordered dt-responsive nowrap" style={{width:'100%'}} ref={ el => this.el= el }></table>
        </div>
      );
    }
  }
}