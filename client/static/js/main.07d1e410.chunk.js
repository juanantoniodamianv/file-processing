(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[0],{102:function(e,a,t){"use strict";t.r(a);var n=t(1),o=t.n(n),r=t(7),l=t.n(r),c=(t(55),t(56),t(18)),i=t.n(c),s=t(39),d=t(40),m=t(41),u=t(49),p=t(48),b=t(10),h=t(47),f=t.n(h),v=t(8),_=t.n(v),y=(t(38),t(98),[{title:"Fecha de consulta",searchable:!1,orderable:!0},{title:"Apellido y nombre",searchable:!0,orderable:!0},{title:"N\xb0 de documento",searchable:!0,orderable:!0},{title:"Obra social",searchable:!1,orderable:!0},{title:"N\xb0 de afiliado",searchable:!1,orderable:!0},{title:"M\xe9dico anestesista",searchable:!0,orderable:!0},{title:"",searchable:!1,orderable:!1,responsivePriority:1}]),g="https://docs.google.com/forms/d/e/1FAIpQLSc1lShphLLta13iZLL8X48QWM9288W64Pg-FiHTyyhiE87Ukg/viewform",E=function(e){Object(u.a)(t,e);var a=Object(p.a)(t);function t(){var e;Object(d.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=a.call.apply(a,[this].concat(o))).state={error:null,isLoaded:!1,items:[]},e.linkActions=function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(e)return'<a href="'.concat(e,'" class="btn btn-sm btn-primary btn-block mb-1" target="_blank">').concat(a,"</a>");var n=t.fecha_de_consulta,o=t.apellido_y_nombre,r=t.numero_de_documento,l=t.medico_anestesista;return n=n.split("/").map((function(e){return 1===e.length?"0".concat(e):e})).reverse().join("-"),o=o.replace(/ /g,"+"),l=l.replace(/ /g,"+"),e="".concat(g,"?entry.905105377=").concat(o,"&entry.1361452324=").concat(r,"&entry.414077469=").concat(n,"&entry.870843167=").concat(l),'<a href="'.concat(e,'" class="btn btn-sm btn-primary btn-block mb-1" target="_blank">').concat(a,' <span class="badge badge-secondary">nuevo</span></a>')},e.getRegisters=Object(s.a)(i.a.mark((function a(){var t;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,f.a.get("/api/Spreadsheets");case 3:t=a.sent,e.setState({isLoaded:!0,items:t.data.response}),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),e.setState({isLoaded:!0,error:a.t0});case 10:case"end":return a.stop()}}),a,null,[[0,7]])}))),e.toClipboard=function(){navigator.clipboard.writeText("https://forms.gle/JRKHLXMjQtzLDQvW7");var e=document.querySelector(".mdbAlert");e.children[0].innerHTML="Se ha copiado la url del formulario al portapapeles, ahora puede compartirlo con su paciente.",e.classList.remove("d-none"),setTimeout((function(){e.classList.add("d-none")}),4e3)},e.refreshTooltip=function(){document.getElementById("btnToClipboard").title="Copiar en el portapapeles la url del formulario para enviar al paciente"},e}return Object(m.a)(t,[{key:"componentDidMount",value:function(){this.getRegisters()}},{key:"componentWillUnmount",value:function(){_()(".data-table-wrapper").find("table").DataTable().destroy(!0)}},{key:"componentDidUpdate",value:function(){var e=this,a=this.state.items.map((function(a){var t=a.fecha_de_consulta,n=a.apellido_y_nombre,o=a.numero_de_documento,r=a.obra_social,l=a.numero_de_afiliado,c=a.medico_anestesista,i=a.form_response_edit_url,s=a.form_response_edit_url_m;return[t,n,o,r,l,c," ".concat(e.linkActions(i,"Formulario Paciente"),"\n          ").concat(e.linkActions(s,"Formulario Medico",{fecha_de_consulta:t,apellido_y_nombre:n,numero_de_documento:o,medico_anestesista:c}))]}));this.$el=_()(this.el),this.$el.DataTable({dom:'<"data-table-wrapper"ft>',data:a,columns:y,ordering:!0,responsive:!0,language:{search:"Buscar Paciente",zeroRecords:"No se han encontrado resultados para tu b\xfasqueda"},initComplete:function(){document.getElementById("DataTables_Table_0").style.display="none",document.getElementById("DataTables_Table_0_filter").style.display="none",this.api().columns([5]).every((function(){var e=this,a=_()('<select><option value="" disabled selected style="display:none;"></option></select>').appendTo("#doctor_table_filter").on("change",(function(){var a=_.a.fn.dataTable.util.escapeRegex(_()(this).val());e.search(a||"",!0,!1).draw(),document.getElementById("DataTables_Table_0").style.display="table",document.getElementById("DataTables_Table_0_filter").style.display="block",document.getElementById("btnToDoctorNewForm").href="".concat(g,"?entry.870843167=").concat(a.replace(/ /g,"+"))}));e.data().unique().sort().each((function(e,t){a.append('<option value="'+e+'">'+e+"</option>")}))}))}})}},{key:"render",value:function(){var e=this,a=this.state,t=a.error,n=a.isLoaded;return t?o.a.createElement("div",null,"Error: ",t.message):n?o.a.createElement("div",null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{id:"doctor_table_filter"},"Seleccionar M\xe9dico "),o.a.createElement(b.c,{color:"secondary",size:"sm",className:"mt-0",id:"btnToClipboard",onMouseOut:this.refreshTooltip.bind(this),onClick:this.toClipboard.bind(this),title:"Copiar en el portapapeles la url del formulario para enviar al paciente"},"Copiar URL Formulario Paciente ",o.a.createElement(b.d,{icon:"copy",className:"ml-1"})),o.a.createElement(b.c,{href:"https://forms.gle/FqMpEQwLaFrX41TG6",color:"secondary",size:"sm",className:"mt-0 ml-1",target:"_blank",id:"btnToDoctorNewForm",title:"Nuevo formulario en otra pesta\xf1a del navegador"},"Formulario del M\xe9dico ",o.a.createElement(b.d,{icon:"external-link-alt",className:"ml-1"}))),o.a.createElement("table",{"data-order":'[[ 0, "desc" ]]',className:"table table-striped table-bordered dt-responsive nowrap",style:{width:"100%"},ref:function(a){return e.el=a}})):o.a.createElement("div",null,"Cargando...")}}]),t}(n.Component);var T=function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"card border-light mb-3"},o.a.createElement("div",{className:"card-header"},"Consulta Preanest\xe9sica - Ficha Pacientes"),o.a.createElement("div",{className:"card-body"},o.a.createElement(E,null)),o.a.createElement(b.b,{color:"success",className:"d-none mdbAlert"},o.a.createElement("span",null,"Alert"))))};t(99),t(100),t(101),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},50:function(e,a,t){e.exports=t(102)},55:function(e,a,t){},56:function(e,a,t){}},[[50,1,2]]]);
//# sourceMappingURL=main.07d1e410.chunk.js.map