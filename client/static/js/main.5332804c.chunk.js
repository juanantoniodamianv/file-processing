(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[0],{21:function(e,t,a){e.exports=a(50)},26:function(e,t,a){},27:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(14),i=a.n(o),c=(a(26),a(27),a(3)),s=a.n(c),l=a(15),d=a(16),u=a(17),m=a(20),p=a(19),b=a(18),h=a.n(b),f=a(2),v=a.n(f),_=(a(13),a(46),[{title:"Fecha",searchable:!1,orderable:!0},{title:"Apellido y Nombre",searchable:!0,orderable:!0},{title:"N\xb0 de Documento",searchable:!0,orderable:!0},{title:"Obra Social",searchable:!1,orderable:!0},{title:"N\xb0 de Afiliado",searchable:!1,orderable:!0},{title:"M\xe9dico Anestesista",searchable:!0,orderable:!0},{title:"",searchable:!1,orderable:!1,responsivePriority:1}]),g=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(d.a)(this,a);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).state={error:null,isLoaded:!1,items:[]},e.linkActions=function(e,t){return e?'<a href="'.concat(e,'" class="btn btn-sm btn-primary btn-block" target="_blank">').concat(t,"</a>"):""},e.getRegisters=Object(l.a)(s.a.mark((function t(){var a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.a.get("/api/Spreadsheets");case 3:a=t.sent,e.setState({isLoaded:!0,items:a.data.response}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.setState({isLoaded:!0,error:t.t0});case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))),e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.getRegisters()}},{key:"componentWillUnmount",value:function(){v()(".data-table-wrapper").find("table").DataTable().destroy(!0)}},{key:"componentDidUpdate",value:function(){var e=this,t=this.state.items.map((function(t){var a=t.fecha,r=t.apellido_y_nombre,n=t.numero_de_documento,o=t.obra_social,i=t.numero_de_afiliado,c=t.medico_anestesista,s=t.form_response_edit_url,l=t.form_response_edit_url_m;return[a,r,n,o,i,c," ".concat(e.linkActions(s,"Formulario Paciente"),"\n          ").concat(e.linkActions(l,"Formulario Medico"))]}));this.$el=v()(this.el),this.$el.DataTable({dom:'<"data-table-wrapper"ft>',data:t,columns:_,ordering:!0,responsive:!0,language:{search:"Buscar Paciente",zeroRecords:"No se han encontrado resultados para tu b\xfasqueda"},initComplete:function(){this.api().columns([5]).every((function(){var e=this,t=v()('<select><option value=""></option></select>').appendTo("#doctor_table_filter").on("change",(function(){var t=v.a.fn.dataTable.util.escapeRegex(v()(this).val());e.search(t||"",!0,!1).draw()}));e.data().unique().sort().each((function(e,a){t.append('<option value="'+e+'">'+e+"</option>")}))}))}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,r=t.isLoaded;return a?n.a.createElement("div",null,"Error: ",a.message):r?n.a.createElement("table",{"data-order":'[[ 0, "desc" ]]',className:"table table-striped table-bordered dt-responsive nowrap",style:{width:"100%"},ref:function(t){return e.el=t}}):n.a.createElement("div",null,"Cargando...")}}]),a}(r.Component);var w=function(){return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"card border-light mb-3"},n.a.createElement("div",{className:"card-header"},"Consulta Preanest\xe9sica - Ficha Pacientes"),n.a.createElement("div",{className:"card-body"},n.a.createElement("div",{id:"doctor_table_filter"},"Seleccionar M\xe9dico "),n.a.createElement(g,null))))};a(47),a(48),a(49),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.5332804c.chunk.js.map