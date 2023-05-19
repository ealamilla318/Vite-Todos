import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todos: [new Todo("tostitos"), new Todo("queso amarillo")],
  filter: Filters.All,
};

const initStore = () => {
  console.log(state);
  loadStore();
  console.log("initstore!");
};

const loadStore = () => {
    if(!localStorage.getItem('state')) return;
    const {todos = [],filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
};

/**
 * 
 * @param {*} filter 
 * @returns 
 */
const getTodos = (filter = Filters.All)=>{
    switch(filter){
        case Filters.All:
            return [...state.todos]
        case Filters.Completed: 
            return state.todos.filter(todo => todo.done === true)
        case Filters.Pending: 
            return state.todos.filter(todo => todo.done === false)
        default:
            throw new Error("Esta opcion no existe")
    }
}

const saveStateToLocalStorage = ()=>{
    localStorage.setItem('state',JSON.stringify(state));
}

const addTodo = (description) => {
    if(!description) throw new Error("La descripcion es obligatoria")
    state.todos.push(new Todo(description))
    saveStateToLocalStorage();
};

const toggleTodo = (todoId) => {
    const todo = state.todos.find(todo => todo.id == todoId);
    todo.done = !todo.done;
    saveStateToLocalStorage();
    return todo;
};



const deleteTodo = (todoId) => {
    state.todos  =  state.todos.filter(todo => todo.id != todoId)
    saveStateToLocalStorage()
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done)
    saveStateToLocalStorage()
};

const setFilter = (newFilter = Filters.All) => {
    console.log(state.filter)
    state.filter = newFilter;
    console.log(state.filter)
};

const getCurrentFilter = () => {
    return state.filter
};

export default {
  initStore,
  getTodos,
  loadStore,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
  Filters
};
