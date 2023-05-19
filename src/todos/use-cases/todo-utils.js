import { Todo } from "../models/todo.model";

let element;

export const createTodoHtml = (todo) => {
  if (!todo) throw new Error("No existen Todos");
  const html = `<div class="view">
      <input class="toggle" type="checkbox" ${todo.done ? 'checked': ''} />
      <label>${todo.description}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template" />`;
  const liElement = document.createElement("li");
  liElement.setAttribute('data-id',todo.id)
  todo.done? liElement.classList.add('completed'): liElement.classList.remove('completed')
  liElement.innerHTML = html;
  return liElement;
};

export const renderTodos = (elementId, todos = []) => {
  if (todos.length <= 0) throw new Error("No existe todos");
  if(!element)
    element = document.querySelector(elementId)
  if(!element) throw new Error("No existe el  elemento que se esta buscando")

  element.innerHTML = '';
  todos.forEach((todo) => {
    element.append(createTodoHtml(todo));
  });
};


export const renderPending = (elementId,todos = [])=>{
    if(!elementId) throw new Error("Se necesita el elemento en el que se renderizara")
    const total = (todos.filter(todo => !todo.done)).length;
    const element = document.querySelector(elementId);
    element.innerHTML = total;
}