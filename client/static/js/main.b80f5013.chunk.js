(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[0],{20:function(e,t,a){e.exports=a(50)},25:function(e,t,a){},26:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),s=a.n(o),i=(a(25),a(26),a(3)),c=a.n(i),l=a(14),d=a(15),u=a(16),m=a(19),p=a(18),h=a(17),v=a.n(h),b=a(2);b.DataTable=a(45);var f=[{title:"Marca temporal"},{title:"Apellido y Nombre"},{title:"N\xfamero de Documento"},{title:"Fecha"},{title:"M\xe9dico Anestesista"},{title:"Obra Social"},{title:"N\xfamero de Afiliado"}],g=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={error:null,isLoaded:!1,items:[]},e.getRegisters=Object(l.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v.a.get("http://localhost:3000/api/Spreadsheets");case 3:a=t.sent,e.setState({isLoaded:!0,items:a.data.response}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.setState({isLoaded:!0,error:t.t0});case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))),e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.getRegisters()}},{key:"componentWillUnmount",value:function(){b(".data-table-wrapper").find("table").DataTable().destroy(!0)}},{key:"componentDidUpdate",value:function(){var e=this.state.items.map((function(e){return[e.marca_temporal,e.apellido_y_nombre,e.numero_de_documento,e.fecha,e.medico_anestesista,e.obra_social,e.numero_de_afiliado]}));this.$el=b(this.el),this.$el.DataTable({searchPanes:{cascadePanes:!0},dom:'<"data-table-wrapper"ft>',data:e,columns:f,ordering:!1,responsive:!0,language:{search:"Buscar"}})}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,n=t.isLoaded;return a?r.a.createElement("div",null,"Error: ",a.message):n?r.a.createElement("table",{className:"table table-striped table-bordered dt-responsive nowrap",style:{width:"100%"},ref:function(t){return e.el=t}}):r.a.createElement("div",null,"Cargando...")}}]),a}(n.Component);var w=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"card border-light mb-3"},r.a.createElement("div",{className:"card-header"},"Consulta Preanestesista - Ficha Pacientes"),r.a.createElement("div",{className:"card-body"},r.a.createElement(g,null))))};a(47),a(48),a(49),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.b80f5013.chunk.js.map