(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[0],{112:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(13),o=a.n(l),c=a(16),s=(a(65),a(30),a(5)),i=a(59),d=a(15),m=a.n(d),u=a(24),p=a(18),b=a(19),f=a(27),h=a(22),g=a(21),v=a(8),y=a(28),E=a.n(y),_=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).getLastRecordOnSpreadsheets=Object(u.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.get("api/Spreadsheets/getLastRegister");case 2:t=e.sent,n.setState({isLoaded:!0,fullName:t.data.response.apellido_y_nombre,documentNumber:t.data.response.numero_de_documento,doctor:t.data.response.medico_anestesista,date:t.data.response.fecha_de_consulta.replace(/\//g,"-")});case 4:case"end":return e.stop()}}),e)}))),n.onChangeHandler=function(e){var t=e.target.files;if(n.maxSelectFile(e)&&n.checkMimeType(e)){var a=document.getElementById("filesList");a.innerHTML="";var r,l=Object(i.a)(t);try{for(l.s();!(r=l.n()).done;){var o=r.value;a.innerHTML+="<li>".concat(o.name,"</li>")}}catch(c){l.e(c)}finally{l.f()}switch(n.setState({selectedFile:t}),t.length){case 1:document.getElementById("submitButton").disabled=!1;break;case 0:document.getElementById("submitButton").disabled=!0;break;default:document.getElementById("submitButton").disabled=!1}}},n.onClickHandler=Object(u.a)(m.a.mark((function e(){var t,a,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for((t=document.getElementById("submitButton")).disabled=!0,t.innerHTML='Cargando im\xe1genes <div class="spinner-border spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div>',a=new FormData,r=0;r<n.state.selectedFile.length;r++)a.append("file",n.state.selectedFile[r]);fetch("api/FileUploads/file-upload?fullName=".concat(n.state.fullName,"&documentNumber=").concat(n.state.documentNumber,"&doctor=").concat(n.state.doctor,"&date=").concat(n.state.date),{mode:"no-cors",method:"POST",body:a,headers:{Enctype:"multipart/form-data","Content-Disposition":"file","Content-Transfer-Encoding":"binary",type:"formData"}}).then((function(e){e.ok?alert("Perfect! "):401==e.status&&alert("Oops! ")}),(function(e){alert("Error submitting form!")}));case 6:case"end":return e.stop()}}),e)}))),n.maxSelectFile=function(e){if(e.target.files.length>10){var t="Solo puede subir 10 im\xe1genes";return e.target.value=null,console.log(t),n.formatNotValidAlert(t),!1}return!0},n.checkMimeType=function(e){for(var t=e.target.files,a="",r=["image/png","image/jpeg","image/jpg"],l=function(e){r.every((function(a){return t[e].type!==a}))&&(a+="".concat(t[e].type," no es un formato v\xe1lido."))},o=0;o<t.length;o++)l(o);return""===a||(e.target.value=null,console.log(a),n.formatNotValidAlert("El formato de im\xe1gen no es v\xe1lido. Formatos v\xe1lidos (png, jpg, jpeg)"),!1)},n.formatNotValidAlert=function(e){var t=document.querySelector(".mdbAlert");t.children[0].innerHTML=e,t.classList.remove("d-none"),setTimeout((function(){t.classList.add("d-none")}),4e3)},n.state={selectedFile:null,isLoaded:null,fullName:null,documentNumber:null,doctor:null,date:null,submitResponse:null},n.onClickHandler=n.onClickHandler.bind(Object(f.a)(n)),n}return Object(b.a)(a,[{key:"componentDidMount",value:function(){this.getLastRecordOnSpreadsheets()}},{key:"render",value:function(){var e=this.state,t=e.error,a=e.isLoaded,n=e.submitResponse;return t?r.a.createElement("div",null,"Error: ",t.message):a?null!==n?n?r.a.createElement("div",null,"Se han subido correctamente las im\xe1genes"):r.a.createElement("div",null,"Ha ocurrido un error al procesar el formulario"):r.a.createElement(v.i,null,r.a.createElement(v.n,null,r.a.createElement(v.h,{md:"6"},r.a.createElement("form",{method:"post",action:"#"},r.a.createElement("p",{className:"h4 text-center mb-4"},"Adjuntar Im\xe1genes en Ficha Pacientes "),r.a.createElement("label",{htmlFor:"defaultFormRegister1",className:"grey-text"},"Apellido y nombre"),r.a.createElement("input",{type:"text",id:"defaultFormRegister1",name:"fullName",className:"form-control",defaultValue:this.state.fullName,disabled:!0}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"defaultFormRegister2",className:"grey-text"},"Nro de documento"),r.a.createElement("input",{type:"text",id:"defaultFormRegister2",name:"documentNumber",className:"form-control",defaultValue:this.state.documentNumber,disabled:!0}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"defaultFormRegister3",className:"grey-text"},"M\xe9dico anestes\xedsta"),r.a.createElement("input",{type:"text",id:"defaultFormRegister3",name:"doctor",className:"form-control",defaultValue:this.state.doctor,disabled:!0}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"defaultFormRegister4",className:"grey-text"},"Fecha de consulta"),r.a.createElement("input",{type:"text",id:"defaultFormRegister4",name:"date",className:"form-control",defaultValue:this.state.date,disabled:!0}),r.a.createElement("br",null),r.a.createElement(v.d,null,r.a.createElement(v.e,null,r.a.createElement(v.g,null,r.a.createElement("label",{className:"inputFileLabel"},r.a.createElement("input",{type:"file",name:"file",onChange:this.onChangeHandler,multiple:!0}),"Cargar im\xe1genes"),r.a.createElement("ul",{id:"filesList"}))),r.a.createElement(v.f,{small:!0,muted:!0,id:"footerUploads"},"\xdanicamente PNG, JPG y JPEG.",r.a.createElement("br",null),"M\xe1ximo 10 im\xe1genes")),r.a.createElement("br",null),r.a.createElement("button",{type:"button",className:"btn btn-success btn-block",onClick:this.onClickHandler,id:"submitButton"},"Subir Im\xe1genes"))))):r.a.createElement("div",null,"Cargando...",r.a.createElement("div",{className:"spinner-border spinner-border-sm",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")))}}]),a}(n.Component),N=a(14),k=a.n(N),F=(a(53),a(108),[{title:"Fecha de consulta",searchable:!1,orderable:!0},{title:"Apellido y nombre",searchable:!0,orderable:!0},{title:"N\xb0 de documento",searchable:!0,orderable:!0},{title:"Obra social",searchable:!1,orderable:!0},{title:"N\xb0 de afiliado",searchable:!1,orderable:!0},{title:"M\xe9dico anestesista",searchable:!0,orderable:!0},{title:"",searchable:!1,orderable:!1,responsivePriority:1}]),L="https://docs.google.com/forms/d/e/1FAIpQLSc1lShphLLta13iZLL8X48QWM9288W64Pg-FiHTyyhiE87Ukg/viewform",T=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={error:null,isLoaded:!1,items:[]},e.linkActions=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(e)return'<a href="'.concat(e,'" class="btn btn-sm btn-primary btn-block mb-1" target="_blank">').concat(t,"</a>");var n=a.fecha_de_consulta,r=a.apellido_y_nombre,l=a.numero_de_documento,o=a.medico_anestesista;return n=n.split("/").map((function(e){return 1===e.length?"0".concat(e):e})).reverse().join("-"),r=r.replace(/ /g,"+"),o=o.replace(/ /g,"+"),e="".concat(L,"?entry.905105377=").concat(r,"&entry.1361452324=").concat(l,"&entry.414077469=").concat(n,"&entry.870843167=").concat(o),'<a href="'.concat(e,'" class="btn btn-sm btn-primary btn-block mb-1" target="_blank">').concat(t,' <span class="badge badge-secondary">nuevo</span></a>')},e.getRegisters=Object(u.a)(m.a.mark((function t(){var a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,E.a.get("api/Spreadsheets");case 3:a=t.sent,e.setState({isLoaded:!0,items:a.data.response}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.setState({isLoaded:!0,error:t.t0});case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))),e.toClipboard=function(){navigator.clipboard.writeText("https://forms.gle/JRKHLXMjQtzLDQvW7");var e=document.querySelector(".mdbAlert");e.children[0].innerHTML="Se ha copiado la url del formulario al portapapeles, ahora puede compartirlo con su paciente.",e.classList.remove("d-none"),setTimeout((function(){e.classList.add("d-none")}),4e3)},e.refreshTooltip=function(){document.getElementById("btnToClipboard").title="Copiar en el portapapeles la url del formulario para enviar al paciente"},e}return Object(b.a)(a,[{key:"componentDidMount",value:function(){this.getRegisters()}},{key:"componentWillUnmount",value:function(){k()(".data-table-wrapper").find("table").DataTable().destroy(!0)}},{key:"componentDidUpdate",value:function(){var e=this,t=this.state.items.map((function(t){var a=t.fecha_de_consulta,n=t.apellido_y_nombre,r=t.numero_de_documento,l=t.obra_social,o=t.numero_de_afiliado,c=t.medico_anestesista,s=t.form_response_edit_url,i=t.form_response_edit_url_m;return[a,n,r,l,o,c," ".concat(e.linkActions(s,"Formulario Paciente"),"\n          ").concat(e.linkActions(i,"Formulario Medico",{fecha_de_consulta:a,apellido_y_nombre:n,numero_de_documento:r,medico_anestesista:c}))]}));this.$el=k()(this.el),this.$el.DataTable({dom:'<"data-table-wrapper"ft>',data:t,columns:F,ordering:!0,pageLength:100,responsive:!0,language:{search:"Buscar Paciente",zeroRecords:"No se han encontrado resultados para tu b\xfasqueda"},initComplete:function(){document.getElementById("DataTables_Table_0").style.display="none",document.getElementById("DataTables_Table_0_filter").style.display="none",this.api().columns([5]).every((function(){var e=this,t=k()('<select><option value="" disabled selected style="display:none;"></option></select>').appendTo("#doctor_table_filter").on("change",(function(){var t=k.a.fn.dataTable.util.escapeRegex(k()(this).val());e.search(t||"",!0,!1).draw(),document.getElementById("DataTables_Table_0").style.display="table",document.getElementById("DataTables_Table_0_filter").style.display="block",document.getElementById("btnToDoctorNewForm").href="".concat(L,"?entry.870843167=").concat(t.replace(/ /g,"+"))}));e.data().unique().sort().each((function(e,a){t.append('<option value="'+e+'">'+e+"</option>")}))}))}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,n=t.isLoaded;return a?r.a.createElement("div",null,"Error: ",a.message):n?r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{id:"doctor_table_filter"},"Seleccionar M\xe9dico "),r.a.createElement(v.c,{color:"secondary",size:"sm",className:"mt-0",id:"btnToClipboard",onMouseOut:this.refreshTooltip.bind(this),onClick:this.toClipboard.bind(this),title:"Copiar en el portapapeles la url del formulario para enviar al paciente"},"Copiar URL Formulario Paciente ",r.a.createElement(v.j,{icon:"copy",className:"ml-1"})),r.a.createElement(v.c,{href:"https://forms.gle/FqMpEQwLaFrX41TG6",color:"secondary",size:"sm",className:"mt-0 ml-1",target:"_blank",id:"btnToDoctorNewForm",title:"Nuevo formulario en otra pesta\xf1a del navegador"},"Formulario del M\xe9dico ",r.a.createElement(v.j,{icon:"external-link-alt",className:"ml-1"}))),r.a.createElement("table",{"data-order":'[[ 0, "desc" ]]',className:"table table-striped table-bordered dt-responsive nowrap",style:{width:"100%"},ref:function(t){return e.el=t}})):r.a.createElement("div",null,"Cargando...")}}]),a}(n.Component),w=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(b.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"card border-light mb-3"},r.a.createElement("div",{className:"card-header"},"Consulta Preanest\xe9sica - Ficha Pacientes"),r.a.createElement("div",{className:"card-body"},r.a.createElement(T,null))))}}]),a}(n.Component),C=function(){return r.a.createElement("main",null,r.a.createElement(v.b,{color:"warning",className:"mb-3 d-none mdbAlert"},r.a.createElement("span",null,"Alert")),r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/",component:w}),r.a.createElement(s.a,{exact:!0,path:"/file-uploads",component:_})))};var j=function(){return r.a.createElement("div",null,r.a.createElement(C,null))};a(109),a(110),a(111),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(c.a,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},30:function(e,t,a){},60:function(e,t,a){e.exports=a(112)},65:function(e,t,a){}},[[60,1,2]]]);
//# sourceMappingURL=main.958da4b3.chunk.js.map