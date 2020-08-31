(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[0],{112:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(18),o=a.n(r),c=a(22),s=(a(65),a(31),a(6)),i=a(29),d=a(16),u=a.n(d),m=a(25),p=a(11),b=a(12),f=a(21),h=a(14),g=a(13),E=a(3),v=a(19),y=a.n(v),N=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(b.a)(a,[{key:"render",value:function(){return l.a.createElement("li",{id:this.props.fileName},this.props.fileName," ",l.a.createElement("button",{type:"button",onClick:this.props.onClick,className:"btn btn-deep-orange btn-sm waves-effect waves-light"},"eliminar"))}}]),a}(n.Component),_=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(b.a)(a,[{key:"render",value:function(){return l.a.createElement(E.i,null,l.a.createElement(E.l,{keyboard:!1,isOpen:!0,size:"lg"},l.a.createElement(E.o,null,"Sus estudios se han cargado correctamente"),l.a.createElement(E.m,null,l.a.createElement("p",null,"Indicaciones para el d\xeda de la cirug\xeda:"),l.a.createElement("ul",null,l.a.createElement("li",null,"8 hs de ayuno (nada de s\xf3lidos ni l\xedquidos)."),l.a.createElement("li",null,"El d\xeda previo tomar la medicaci\xf3n habitual (NO ASPIRINAS)."),l.a.createElement("li",null,"Quitarse la pr\xf3tesis dental antes de ir a quirofano."),l.a.createElement("li",null,"No ir a quirofano con u\xf1as pintadas."))),l.a.createElement(E.n,null,l.a.createElement("p",null,"Ahora puede cerrar este sitio"))))}}]),a}(n.Component),k=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).getLastRecordOnSpreadsheets=Object(m.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a.get("api/Spreadsheets/getLastRegister");case 2:t=e.sent,n.setState({isLoaded:!0,fullName:t.data.response.apellido_y_nombre,documentNumber:t.data.response.numero_de_documento,doctor:t.data.response.medico_anestesista,date:t.data.response.fecha_de_consulta.replace(/\//g,"-")});case 4:case"end":return e.stop()}}),e)}))),n.onChangeHandler=function(e){var t=e.target.files;n.maxSelectFile(e)&&n.checkMimeType(e)&&n.maxFileSize(e)&&(n.state.selectedFile?n.setState({selectedFile:[].concat(Object(i.a)(n.state.selectedFile),Object(i.a)(t))}):n.setState({selectedFile:t}))},n.deleteFile=function(e){var t=Object(i.a)(n.state.selectedFile).filter((function(t){return t.name!==e}));n.setState({selectedFile:t})},n.onClickHandler=Object(m.a)(u.a.mark((function e(){var t,a,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.state.selectedFile&&n.state.selectedFile.length){e.next=3;break}return n.formatNotValidAlert("Debe seleccionar al menos una im\xe1gen."),e.abrupt("return");case 3:for((t=document.getElementById("submitButton")).disabled=!0,t.innerHTML='Cargando im\xe1genes <div class="spinner-border spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div>',a=new FormData,l=0;l<n.state.selectedFile.length;l++)a.append("file",n.state.selectedFile[l]);return e.next=10,y.a.post("api/FileUploads/file-upload?fullName=".concat(n.state.fullName,"&documentNumber=").concat(n.state.documentNumber,"&doctor=").concat(n.state.doctor,"&date=").concat(n.state.date),a,{});case 10:200===e.sent.status?n.setState({submitResponse:!0}):n.setState({submitResponse:!1});case 12:case"end":return e.stop()}}),e)}))),n.maxSelectFile=function(e){if(e.target.files.length>10){var t="Solo puede subir 10 im\xe1genes";return e.target.value=null,console.log(t),n.formatNotValidAlert(t),!1}return!0},n.checkMimeType=function(e){for(var t=e.target.files,a="",l=["image/png","image/jpeg","image/jpg"],r=function(e){l.every((function(a){return t[e].type!==a}))&&(a+="".concat(t[e].type," no es un formato v\xe1lido."))},o=0;o<t.length;o++)r(o);return""===a||(e.target.value=null,console.log(a),n.formatNotValidAlert("El formato de im\xe1gen no es v\xe1lido. Formatos v\xe1lidos (png, jpg, jpeg)"),!1)},n.maxFileSize=function(e){for(var t=e.target.files,a="",l=0;l<t.length;l++)t[l].size>2e6&&(a+="".concat(t[l].name," excede el tama\xf1o permitido (2MB por archivo)."));return""===a||(e.target.value=null,console.log(a),n.formatNotValidAlert("El tama\xf1o maximo permitido es de 2MB por im\xe1gen."),!1)},n.formatNotValidAlert=function(e){var t=document.querySelector(".formatNotValidAlert");t.children[0].innerHTML=e,t.classList.remove("d-none"),setTimeout((function(){t.classList.add("d-none")}),8e3)},n.state={selectedFile:null,isLoaded:null,fullName:null,documentNumber:null,doctor:null,date:null,submitResponse:null},n.onClickHandler=n.onClickHandler.bind(Object(f.a)(n)),n}return Object(b.a)(a,[{key:"componentDidMount",value:function(){this.getLastRecordOnSpreadsheets()}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,n=t.isLoaded,r=t.submitResponse,o=t.selectedFile;return a?l.a.createElement("div",null,"Error: ",a.message):n?null!==r?r?l.a.createElement(_,null):l.a.createElement("div",null,"Ha ocurrido un error al procesar el formulario"):l.a.createElement(E.i,null,l.a.createElement(E.r,null,l.a.createElement(E.h,{md:"6"},l.a.createElement("form",{method:"post",action:"#"},l.a.createElement("p",{className:"h4 text-center mt-4"},"Adjuntar Estudios En Ficha Pacientes "),l.a.createElement("p",{className:"h6 text-center mb-4"},"Aqui debe adjuntar los estudios de su \xfaltimo laboratorio (que contenga hemograma y coagulograma) y electrocardiograma completo con valoraci\xf3n."),l.a.createElement("label",{htmlFor:"defaultFormRegister1",className:"grey-text"},"Apellido y nombre"),l.a.createElement("input",{type:"text",id:"defaultFormRegister1",name:"fullName",className:"form-control",defaultValue:this.state.fullName,disabled:!0}),l.a.createElement("br",null),l.a.createElement("label",{htmlFor:"defaultFormRegister2",className:"grey-text"},"Nro de documento"),l.a.createElement("input",{type:"text",id:"defaultFormRegister2",name:"documentNumber",className:"form-control",defaultValue:this.state.documentNumber,disabled:!0}),l.a.createElement("br",null),l.a.createElement("label",{htmlFor:"defaultFormRegister3",className:"grey-text"},"M\xe9dico anestes\xedsta"),l.a.createElement("input",{type:"text",id:"defaultFormRegister3",name:"doctor",className:"form-control",defaultValue:this.state.doctor,disabled:!0}),l.a.createElement("br",null),l.a.createElement("label",{htmlFor:"defaultFormRegister4",className:"grey-text"},"Fecha de consulta"),l.a.createElement("input",{type:"text",id:"defaultFormRegister4",name:"date",className:"form-control",defaultValue:this.state.date,disabled:!0}),l.a.createElement("br",null),l.a.createElement(E.d,null,l.a.createElement(E.e,null,l.a.createElement(E.g,null,l.a.createElement("label",{className:"inputFileLabel"},l.a.createElement("input",{type:"file",name:"file",onChange:this.onChangeHandler,multiple:!0}),"Cargar estudios"),l.a.createElement("p",null,l.a.createElement("h6",null,"Por favor, recuerde subir im\xe1genes n\xedtidas y de f\xe1cil lectura.")),l.a.createElement(E.b,{color:"warning",className:"d-none formatNotValidAlert"},l.a.createElement("span",null,"Alert")),l.a.createElement("ul",{id:"filesList"},o&&Array.from(o).map((function(t){return l.a.createElement(N,{fileName:t.name,onClick:e.deleteFile.bind(e,t.name)})}))))),l.a.createElement(E.f,{small:!0,muted:!0,id:"footerUploads"},"\xdanicamente im\xe1genes (PNG, JPG y JPEG)",l.a.createElement("br",null),"M\xe1ximo 10 im\xe1genes",l.a.createElement("br",null),"Tama\xf1o m\xe1ximo por im\xe1gen 2MB")),l.a.createElement("br",null),l.a.createElement("button",{type:"button",className:"btn btn-success btn-block",onClick:this.onClickHandler,id:"submitButton"},"Subir estudios"))))):l.a.createElement("div",null,"Cargando...",l.a.createElement("div",{className:"spinner-border spinner-border-sm",role:"status"},l.a.createElement("span",{className:"sr-only"},"Loading...")))}}]),a}(n.Component),F=a(20),j=a.n(F),w=(a(54),a(108),function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e,n){var l;return Object(p.a)(this,a),(l=t.call(this,e,n)).handleShow=l.handleShow.bind(Object(f.a)(l)),l.handleClose=l.handleClose.bind(Object(f.a)(l)),l.state={show:!1,fileUrls:{}},l}return Object(b.a)(a,[{key:"handleShow",value:function(e){this.setState({show:!0,fileUrls:e})}},{key:"handleClose",value:function(){this.setState({show:!1,fileUrls:{}})}},{key:"render",value:function(){return l.a.createElement(E.i,null,l.a.createElement(E.l,{isOpen:this.state.show,size:"lg",position:"bottom"},l.a.createElement(E.o,null,"Estudios adjuntos"),l.a.createElement(E.m,null,this.state.fileUrls.length?this.state.fileUrls.map((function(e){return l.a.createElement(E.r,{className:"mb-4"},l.a.createElement(E.h,{md:"12"},l.a.createElement("div",{class:"aspect-ratio-box"},l.a.createElement("img",{src:e.url,className:"img-fluid",alt:""}))))})):l.a.createElement("p",null,"El paciente no ha cargado ningun estudio")),l.a.createElement(E.n,null,l.a.createElement(E.c,{color:"secondary",onClick:this.handleClose},"Cerrar"))))}}]),a}(n.Component)),O=[{title:"Fecha de consulta",searchable:!1,orderable:!0},{title:"Apellido y nombre",searchable:!0,orderable:!0},{title:"N\xb0 de documento",searchable:!0,orderable:!0},{title:"Obra social",searchable:!1,orderable:!0},{title:"N\xb0 de afiliado",searchable:!1,orderable:!0},{title:"M\xe9dico anestesista",searchable:!0,orderable:!0},{title:"",searchable:!1,orderable:!1,responsivePriority:1}],C="https://docs.google.com/forms/d/e/1FAIpQLSc1lShphLLta13iZLL8X48QWM9288W64Pg-FiHTyyhiE87Ukg/viewform",x=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={error:null,isLoaded:!1,items:[]},e.linkActionsGetImage=function(e){return'<a data-document="'.concat(e,'" class="verEstudiosBtn btn btn-sm btn-primary btn-block mb-1" target="_blank">Ver estudios</a>')},e.linkActions=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(!e&&!a)return'<a href="#" class="btn btn-sm btn-primary btn-block mb-1 disabled" target="_blank">'.concat(t,"</a>");if(e)return'<a href="'.concat(e,'" class="btn btn-sm btn-primary btn-block mb-1" target="_blank">').concat(t,"</a>");var n=a.fecha_de_consulta,l=a.apellido_y_nombre,r=a.numero_de_documento,o=a.medico_anestesista;return console.log(l),n=n.split("/").map((function(e){return 1===e.length?"0".concat(e):e})).reverse().join("-"),l=l.replace(/ /g,"+"),o=o.replace(/ /g,"+"),e="".concat(C,"?entry.905105377=").concat(l,"&entry.1361452324=").concat(r,"&entry.414077469=").concat(n,"&entry.870843167=").concat(o),'<a href="'.concat(e,'" class="btn btn-sm btn-primary btn-block mb-1" target="_blank">').concat(t,' <span class="badge badge-secondary">nuevo</span></a>')},e.getRegisters=Object(m.a)(u.a.mark((function t(){var a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,y.a.get("api/Spreadsheets");case 3:a=t.sent,e.setState({isLoaded:!0,items:a.data.response}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.setState({isLoaded:!0,error:t.t0});case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))),e.toClipboard=function(){navigator.clipboard.writeText("https://forms.gle/JRKHLXMjQtzLDQvW7");var e=document.querySelector(".mdbAlert");e.children[0].innerHTML="Se ha copiado la url del formulario al portapapeles, ahora puede compartirlo con su paciente.",e.classList.remove("d-none"),setTimeout((function(){e.classList.add("d-none")}),4e3)},e.refreshTooltip=function(){document.getElementById("btnToClipboard").title="Copiar en el portapapeles la url del formulario para enviar al paciente"},e.modalRef=function(t){var a=t.handleShow;e.showModal=a},e.openModal=function(){var t=Object(m.a)(u.a.mark((function t(a){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.a.get("api/FileUploads/get-files?documentNumber=".concat(a));case 2:n=t.sent,e.showModal(n.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(b.a)(a,[{key:"componentDidMount",value:function(){this.getRegisters()}},{key:"componentWillUnmount",value:function(){j()(".data-table-wrapper").find("table").DataTable().destroy(!0)}},{key:"componentDidUpdate",value:function(){var e=this,t=this.state.items.map((function(t){var a=t.fecha_de_consulta,n=t.apellido_y_nombre,l=t.numero_de_documento,r=t.obra_social,o=t.numero_de_afiliado,c=t.medico_anestesista,s=t.form_response_edit_url,i=t.form_response_edit_url_m;return[a,n,l,r,o,c," ".concat(e.linkActions(s,"Formulario Paciente"),"\n          ").concat(e.linkActions(i,"Formulario Medico",{fecha_de_consulta:a,apellido_y_nombre:n,numero_de_documento:l,medico_anestesista:c}),"\n          ").concat(e.linkActionsGetImage(l))]}));this.$el=j()(this.el),this.$el.DataTable({dom:'<"data-table-wrapper"ft>',data:t,columns:O,ordering:!0,pageLength:100,responsive:!0,language:{search:"Buscar Paciente",zeroRecords:"No se han encontrado resultados para tu b\xfasqueda"},initComplete:function(){document.getElementById("DataTables_Table_0").style.display="none",document.getElementById("DataTables_Table_0_filter").style.display="none",this.api().columns([5]).every((function(){var e=this,t=j()('<select><option value="" disabled selected style="display:none;"></option></select>').appendTo("#doctor_table_filter").on("change",(function(){var t=j.a.fn.dataTable.util.escapeRegex(j()(this).val());e.search(t||"",!0,!1).draw(),document.getElementById("DataTables_Table_0").style.display="table",document.getElementById("DataTables_Table_0_filter").style.display="block",document.getElementById("btnToDoctorNewForm").href="".concat(C,"?entry.870843167=").concat(t.replace(/ /g,"+"))}));e.data().unique().sort().each((function(e,a){t.append('<option value="'+e+'">'+e+"</option>")}))}))}});var a=document.getElementsByClassName("verEstudiosBtn");Array.from(a).forEach((function(t){t.addEventListener("click",(function(a){a.preventDefault(),e.openModal(t.getAttribute("data-document"))}))}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,n=t.isLoaded;return a?l.a.createElement("div",null,"Error: ",a.message):n?l.a.createElement("div",null,l.a.createElement("div",{className:"row"},l.a.createElement("div",{id:"doctor_table_filter"},"Seleccionar M\xe9dico "),l.a.createElement(E.c,{color:"secondary",size:"sm",className:"mt-0",id:"btnToClipboard",onMouseOut:this.refreshTooltip.bind(this),onClick:this.toClipboard.bind(this),title:"Copiar en el portapapeles la url del formulario para enviar al paciente"},"Copiar URL Formulario Paciente ",l.a.createElement(E.j,{icon:"copy",className:"ml-1"})),l.a.createElement(E.c,{href:"https://forms.gle/FqMpEQwLaFrX41TG6",color:"secondary",size:"sm",className:"mt-0 ml-1",target:"_blank",id:"btnToDoctorNewForm",title:"Nuevo formulario en otra pesta\xf1a del navegador"},"Formulario del M\xe9dico ",l.a.createElement(E.j,{icon:"external-link-alt",className:"ml-1"}))),l.a.createElement("table",{"data-order":'[[ 0, "desc" ]]',className:"table table-striped table-bordered dt-responsive nowrap",style:{width:"100%"},ref:function(t){return e.el=t}}),l.a.createElement(w,{ref:this.modalRef})):l.a.createElement("div",null,"Cargando...")}}]),a}(n.Component),L=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(b.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"card border-light mb-3"},l.a.createElement("div",{className:"card-header"},"Consulta Preanest\xe9sica - Ficha Pacientes"),l.a.createElement("div",{className:"card-body"},l.a.createElement(x,null))))}}]),a}(n.Component),S=function(){return l.a.createElement("main",null,l.a.createElement(E.b,{color:"warning",className:"d-none mdbAlert"},l.a.createElement("span",null,"Alert")),l.a.createElement(s.c,null,l.a.createElement(s.a,{exact:!0,path:"/",component:L}),l.a.createElement(s.a,{exact:!0,path:"/file-uploads",component:k})))};var A=function(){return l.a.createElement("div",null,l.a.createElement(S,null))};a(109),a(110),a(111),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));y.a.defaults.baseURL="/",o.a.render(l.a.createElement(c.a,null,l.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},31:function(e,t,a){},60:function(e,t,a){e.exports=a(112)},65:function(e,t,a){}},[[60,1,2]]]);
//# sourceMappingURL=main.1b5ce9f9.chunk.js.map