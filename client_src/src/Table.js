import React, {Component} from 'react';
import axios from 'axios';
const $ = require('jquery');
$.DataTable = require('datatables.net');

const columns = [
  { 
    title: 'Marca temporal',
  },
  { 
    title: 'Apellido y Nombre',
  },
  { 
    title: 'Número de Documento',
  },
  { 
    title: 'Fecha',
  },
  { 
    title: 'Médico Anestesista',
  },
  { 
    title: 'Obra Social',
  },
  { 
    title: 'Número de Afiliado',
  }
];

/* const data = [
  [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800", "Juasna" ],
  [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750", "Juasna" ]
] */
export class Table extends Component { 
  
  /* constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  } */

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
    let data = this.state.items.map(({marca_temporal, apellido_y_nombre, numero_de_documento, fecha, medico_anestesista, obra_social, numero_de_afiliado}) =>
      [marca_temporal, apellido_y_nombre, numero_de_documento, fecha, medico_anestesista, obra_social, numero_de_afiliado]
    )
    this.$el = $(this.el)
    console.log(this.$el);
    this.$el.DataTable({
      dom: '<"data-table-wrapper"t>',
      data,
      columns,
      ordering: false
    })
  }

    getRegisters = async () => {
      try {
        let items = await axios.get('http://localhost:3000/api/Spreadsheets')
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
        return <table className="display table table-striped table-bordered" ref={ el => this.el= el }></table>;
      }
    }
}