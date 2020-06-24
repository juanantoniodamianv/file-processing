import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import axios from 'axios';
import $ from 'jquery';

import 'datatables.net'
import 'datatables.net-responsive'

import ImagesModal from '../utils/ImagesModal';

const columns = [
  { 
    title: 'Fecha de consulta',
    searchable: false,
    orderable: true
  },
  { 
    title: 'Apellido y nombre',
    searchable: true,
    orderable: true
  },
  { 
    title: 'N° de documento',
    searchable: true,
    orderable: true
  },
  { 
    title: 'Obra social',
    searchable: false,
    orderable: true
  },
  { 
    title: 'N° de afiliado',
    searchable: false,
    orderable: true
  },
  { 
    title: 'Médico anestesista',
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

//const patientNewForm = ''
const doctorNewForm = 'https://docs.google.com/forms/d/e/1FAIpQLSc1lShphLLta13iZLL8X48QWM9288W64Pg-FiHTyyhiE87Ukg/viewform'//?entry.870843167=ARREDONDO+MARCELINO+20928601000

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
    let data = this.state.items.map(({fecha_de_consulta, apellido_y_nombre, numero_de_documento, obra_social, numero_de_afiliado, medico_anestesista, form_response_edit_url, form_response_edit_url_m}) =>
      [ fecha_de_consulta, 
        apellido_y_nombre, 
        numero_de_documento, 
        obra_social, 
        numero_de_afiliado, 
        medico_anestesista, 
        ` ${this.linkActions(form_response_edit_url, 'Formulario Paciente')}
          ${this.linkActions(form_response_edit_url_m, 'Formulario Medico', {fecha_de_consulta, apellido_y_nombre, numero_de_documento, medico_anestesista})}
          ${this.linkActionsGetImage(numero_de_documento)}`]
    )
    this.$el = $(this.el)
    this.$el.DataTable({
      dom: '<"data-table-wrapper"ft>',
      data,
      columns,
      ordering: true,
      pageLength: 100,
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
                  document.getElementById('btnToDoctorNewForm').href = `${doctorNewForm}?entry.870843167=${val.replace(/ /g,"+")}`;
                });
            column.data().unique().sort().each( function ( d, j ) {
                select.append( '<option value="'+d+'">'+d+'</option>' )
            });
        });
      }

    })
    let elements = document.getElementsByClassName("verEstudiosBtn");
    Array.from(elements).forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        this.openModal(element.getAttribute("data-document"));
      });
    }) 
  }

  linkActionsGetImage = (attr) => {
    return `<a data-document="${attr}" class="verEstudiosBtn btn btn-sm btn-primary btn-block mb-1" target="_blank">Ver estudios</a>`;
  }

  linkActions = (url, title, attr = null) => {
    if (url) {
      return `<a href="${url}" class="btn btn-sm btn-primary btn-block mb-1" target="_blank">${title}</a>`;
    }
    let { fecha_de_consulta, apellido_y_nombre, numero_de_documento, medico_anestesista } = attr;

    fecha_de_consulta = fecha_de_consulta.split('/').map(e => (e.length === 1) ? `0${e}` : e).reverse().join('-');
    apellido_y_nombre = apellido_y_nombre.replace(/ /g,"+");
    medico_anestesista = medico_anestesista.replace(/ /g,"+");

    url = `${doctorNewForm}?entry.905105377=${apellido_y_nombre}&entry.1361452324=${numero_de_documento}&entry.414077469=${fecha_de_consulta}&entry.870843167=${medico_anestesista}`;
    return `<a href="${url}" class="btn btn-sm btn-primary btn-block mb-1" target="_blank">${title} <span class="badge badge-secondary">nuevo</span></a>`;
  }

  getRegisters = async () => {
    try {
      let items = await axios.get('api/Spreadsheets')
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
    let alert = document.querySelector(".mdbAlert")
    alert.children[0].innerHTML = "Se ha copiado la url del formulario al portapapeles, ahora puede compartirlo con su paciente.";
    alert.classList.remove('d-none');
    setTimeout(() => { alert.classList.add('d-none') }, 4000);
  }

  refreshTooltip = () => {
    let el = document.getElementById("btnToClipboard");
    el.title = "Copiar en el portapapeles la url del formulario para enviar al paciente";
  }

  modalRef = ({handleShow}) => {
    this.showModal = handleShow;
  }
 
  openModal = async (documentNumber) => {
    let fileUrls = await axios.get(`api/FileUploads/get-files?documentNumber=${documentNumber}`);
    this.showModal(fileUrls.data);
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

            <MDBBtn color="secondary" size="sm" className="mt-0" id="btnToClipboard" onMouseOut={this.refreshTooltip.bind(this)} onClick={this.toClipboard.bind(this)} title="Copiar en el portapapeles la url del formulario para enviar al paciente">
              Copiar URL Formulario Paciente <MDBIcon icon="copy" className="ml-1" />
            </MDBBtn>

            <MDBBtn href="https://forms.gle/FqMpEQwLaFrX41TG6" color="secondary" size="sm" className="mt-0 ml-1" target="_blank" id="btnToDoctorNewForm" title="Nuevo formulario en otra pestaña del navegador">
              Formulario del Médico <MDBIcon icon="external-link-alt" className="ml-1" />
            </MDBBtn>

          </div>
          <table data-order='[[ 0, "desc" ]]' className="table table-striped table-bordered dt-responsive nowrap" style={{width:'100%'}} ref={ el => this.el= el }></table>
          <ImagesModal ref={this.modalRef}/>
        </div>
      );
    }
  }
}