(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[0],{20:function(e,t,a){e.exports=a(50)},25:function(e,t,a){},26:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(13),i=a.n(o),s=(a(25),a(26),a(3)),c=a.n(s),l=a(14),d=a(15),u=a(16),m=a(19),p=a(18),h=a(17),b=a.n(h),v=a(2);v.DataTable=a(45);var f=[{title:"Fecha"},{title:"Apellido y Nombre"},{title:"N\xb0 de Documento"},{title:"Obra Social"},{title:"N\xb0 de Afiliado"},{title:"M\xe9dico Anestesista"},{title:""}],_=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(d.a)(this,a);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).state={error:null,isLoaded:!1,items:[]},e.getRegisters=Object(l.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.a.get("/api/Spreadsheets");case 3:a=t.sent,e.setState({isLoaded:!0,items:a.data.response}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.setState({isLoaded:!0,error:t.t0});case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))),e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.getRegisters()}},{key:"componentWillUnmount",value:function(){v(".data-table-wrapper").find("table").DataTable().destroy(!0)}},{key:"componentDidUpdate",value:function(){var e=this.state.items.map((function(e){var t=e.marca_temporal,a=e.apellido_y_nombre,r=e.numero_de_documento,n=e.obra_social,o=e.numero_de_afiliado,i=e.medico_anestesista,s=e.form_response_edit_url,c=e.form_response_edit_url_m;return[t,a,r,n,o,i,'<a href="'.concat(s,'" target="_blank">Ver Formulario Paciente</a><br>\n        <a href="').concat(c,'" target="_blank">Ver Formulario M\xe9dico</a>')]}));this.$el=v(this.el),this.$el.DataTable({searchPanes:{cascadePanes:!0},dom:'<"data-table-wrapper"ft>',data:e,columns:f,ordering:!1,responsive:!0,language:{search:"Buscar"}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,r=t.isLoaded;return a?n.a.createElement("div",null,"Error: ",a.message):r?n.a.createElement("table",{className:"table table-striped table-bordered dt-responsive nowrap",style:{width:"100%"},ref:function(t){return e.el=t}}):n.a.createElement("div",null,"Cargando...")}}]),a}(r.Component);var g=function(){return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"card border-light mb-3"},n.a.createElement("div",{className:"card-header"},"Consulta Preanest\xe9sica - Ficha Pacientes"),n.a.createElement("div",{className:"card-body"},n.a.createElement(_,null))))};a(47),a(48),a(49),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.55318b8d.chunk.js.map