(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[0],{20:function(e,t,a){e.exports=a(50)},25:function(e,t,a){},26:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),i=a.n(o),s=(a(25),a(26),a(3)),c=a.n(s),l=a(14),d=a(15),u=a(16),m=a(19),p=a(18),b=a(17),h=a.n(b),f=a(2);f.DataTable=a(45);var v=[{title:"Fecha"},{title:"Apellido y Nombre"},{title:"N\xb0 de Documento"},{title:"Obra Social"},{title:"N\xb0 de Afiliado"},{title:"M\xe9dico Anestesista"},{title:""}],g=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={error:null,isLoaded:!1,items:[]},e.linkActions=function(e){return e.map((function(e){if(e)return'<a href="'.concat(e,'" class="btn btn-sm btn-primary btn-block" target="_blank">Ver Formulario Paciente</a>')})),console.log(e),e},e.getRegisters=Object(l.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.a.get("/api/Spreadsheets");case 3:a=t.sent,e.setState({isLoaded:!0,items:a.data.response}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.setState({isLoaded:!0,error:t.t0});case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))),e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.getRegisters()}},{key:"componentWillUnmount",value:function(){f(".data-table-wrapper").find("table").DataTable().destroy(!0)}},{key:"componentDidUpdate",value:function(){var e=this,t=this.state.items.map((function(t){var a=t.marca_temporal,n=t.apellido_y_nombre,r=t.numero_de_documento,o=t.obra_social,i=t.numero_de_afiliado,s=t.medico_anestesista,c=t.form_response_edit_url,l=t.form_response_edit_url_m;return[a,n,r,o,i,s,e.linkActions([c,l])]}));this.$el=f(this.el),this.$el.DataTable({searchPanes:{cascadePanes:!0},dom:'<"data-table-wrapper"ft>',data:t,columns:v,ordering:!1,responsive:!0,language:{search:"Buscar"}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,n=t.isLoaded;return a?r.a.createElement("div",null,"Error: ",a.message):n?r.a.createElement("table",{className:"table table-striped table-bordered dt-responsive nowrap",style:{width:"100%"},ref:function(t){return e.el=t}}):r.a.createElement("div",null,"Cargando...")}}]),a}(n.Component);var _=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"card border-light mb-3"},r.a.createElement("div",{className:"card-header"},"Consulta Preanest\xe9sica - Ficha Pacientes"),r.a.createElement("div",{className:"card-body"},r.a.createElement(g,null))))};a(47),a(48),a(49),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.3cb76a7f.chunk.js.map