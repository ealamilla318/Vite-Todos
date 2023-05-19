(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const d of n)if(d.type==="childList")for(const m of d.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function o(n){const d={};return n.integrity&&(d.integrity=n.integrity),n.referrerPolicy&&(d.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?d.credentials="include":n.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function r(n){if(n.ep)return;n.ep=!0;const d=o(n);fetch(n.href,d)}})();const y=`<section class="todoapp">\r
  <header class="header">\r
    <h1>Tareas</h1>\r
    <input\r
      id="new-todo-input"\r
      class="new-todo"\r
      placeholder="¿Qué necesita ser hecho?"\r
      autofocus\r
    />\r
  </header>\r
\r
  <!-- This section should be hidden by default and shown when there are todos -->\r
  <section class="main">\r
    <input id="toggle-all" class="toggle-all" type="checkbox" />\r
    <label for="toggle-all">Mark all as complete</label>\r
    <ul class="todo-list">\r
        \r
      <!-- \r
      <li>\r
        <div class="view">\r
          <input class="toggle" type="checkbox" />\r
          <label>Comprar un unicornio</label>\r
          <button class="destroy"></button>\r
        </div>\r
        <input class="edit" value="Rule the web" />\r
      </li> -->\r
    </ul>\r
  </section>\r
\r
  <!-- This footer should hidden by default and shown when there are todos -->\r
  <footer class="footer">\r
    <!-- This should be "0 items left" by default -->\r
    <span class="todo-count"\r
      ><strong id="pending-count">0</strong> pendiente(s)</span\r
    >\r
    <!-- Remove this if you don't implement routing -->\r
    <ul class="filters">\r
      <li>\r
        <a class="selected filtro" class="selected" href="#/">Todos</a>\r
      </li>\r
      <li>\r
        <a class="filtro" href="#/active">Pendientes</a>\r
      </li>\r
      <li>\r
        <a class="filtro" href="#/completed">Completados</a>\r
      </li>\r
    </ul>\r
    <!-- Hidden if no completed items are left ↓ -->\r
    <button class="clear-completed">Borrar completados</button>\r
  </footer>\r
</section>\r
\r
<footer class="info">\r
  <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
  <!-- Change this out with your name and url ↓ -->\r
  <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
  <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>\r
`;let u;const w=new Uint8Array(16);function b(){if(!u&&(u=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!u))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return u(w)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function v(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}const T=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),h={randomUUID:T};function S(e,t,o){if(h.randomUUID&&!t&&!e)return h.randomUUID();e=e||{};const r=e.random||(e.rng||b)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t){o=o||0;for(let n=0;n<16;++n)t[o+n]=r[n];return t}return v(r)}class g{constructor(t){this.id=S(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"All",Completed:"Completed",Pending:"Pending"},l={todos:[new g("tostitos"),new g("queso amarillo")],filter:c.All},E=()=>{console.log(l),f(),console.log("initstore!")},f=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},L=(e=c.All)=>{switch(e){case c.All:return[...l.todos];case c.Completed:return l.todos.filter(t=>t.done===!0);case c.Pending:return l.todos.filter(t=>t.done===!1);default:throw new Error("Esta opcion no existe")}},p=()=>{localStorage.setItem("state",JSON.stringify(l))},C=e=>{if(!e)throw new Error("La descripcion es obligatoria");l.todos.push(new g(e)),p()},A=e=>{const t=l.todos.find(o=>o.id==e);return t.done=!t.done,p(),t},x=e=>{l.todos=l.todos.filter(t=>t.id!=e),p()},q=()=>{l.todos=l.todos.filter(e=>!e.done),p()},P=(e=c.All)=>{console.log(l.filter),l.filter=e,console.log(l.filter)},F=()=>l.filter,i={initStore:E,getTodos:L,loadStore:f,addTodo:C,toggleTodo:A,deleteTodo:x,deleteCompleted:q,setFilter:P,getCurrentFilter:F,Filters:c};let a;const U=e=>{if(!e)throw new Error("No existen Todos");const t=`<div class="view">
      <input class="toggle" type="checkbox" ${e.done?"checked":""} />
      <label>${e.description}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template" />`,o=document.createElement("li");return o.setAttribute("data-id",e.id),e.done?o.classList.add("completed"):o.classList.remove("completed"),o.innerHTML=t,o},k=(e,t=[])=>{if(t.length<=0)throw new Error("No existe todos");if(a||(a=document.querySelector(e)),!a)throw new Error("No existe el  elemento que se esta buscando");a.innerHTML="",t.forEach(o=>{a.append(U(o))})},N=(e,t=[])=>{if(!e)throw new Error("Se necesita el elemento en el que se renderizara");const o=t.filter(n=>!n.done).length,r=document.querySelector(e);r.innerHTML=o},I=e=>{const t=()=>{const o=i.getTodos(i.getCurrentFilter());k(".todo-list",o),N("#pending-count",o)};(()=>{const o=document.createElement("div");o.innerHTML=y,document.querySelector(e).append(o),t()})(),document.querySelector("#new-todo-input").addEventListener("keyup",function(o){o.keyCode===13&&o.target.value.trim().length!=0&&(i.addTodo(o.target.value),t(),event.target.value="")}),document.querySelector(".todo-list").addEventListener("click",function(o){const r=o.target.closest("[data-id]");console.log(r),i.toggleTodo(r.getAttribute("data-id")),t()}),document.querySelector(".todo-list").addEventListener("click",function(o){const r=o.target.className==="destroy",n=o.target.closest("[data-id]");!n||!r||(i.deleteTodo(n.getAttribute("data-id")),t())}),document.querySelector(".clear-completed").addEventListener("click",function(o){i.deleteCompleted(),t()}),document.querySelectorAll(".filtro").forEach(o=>{o.addEventListener("click",r=>{switch(document.querySelectorAll(".filtro").forEach(n=>n.classList.remove("selected")),r.target.classList.add("selected"),r.target.text){case"Todos":console.log("Todos"),i.setFilter(i.Filters.All);break;case"Pendientes":console.log("Pendientes"),i.setFilter(i.Filters.Pending);break;case"Completados":console.log("Completados"),i.setFilter(i.Filters.Completed);break}t()})})};i.initStore();I("#app");
