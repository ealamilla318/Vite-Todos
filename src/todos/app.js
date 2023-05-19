import html from './app.html?raw';
import  todoStore from '../store/todo.store';
import { renderTodos,renderPending} from './use-cases';



export const App = (elementId) => {
    const displayTodos = () =>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos('.todo-list',todos)
        renderPending('#pending-count',todos)
    }
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    document.querySelector('#new-todo-input').addEventListener('keyup',function(e){
        if(e.keyCode !== 13) return;
        if(e.target.value.trim().length == 0 ) return;
        todoStore.addTodo(e.target.value);
        displayTodos();
        event.target.value = '';
    })

    document.querySelector('.todo-list').addEventListener('click',function(e){
        const element = e.target.closest('[data-id]')
        console.log(element);
        todoStore.toggleTodo(element.getAttribute('data-id'))
        displayTodos();
    })

    document.querySelector('.todo-list').addEventListener('click',function(e){
        const isDestroyElement = e.target.className === 'destroy';
        const element = e.target.closest('[data-id]');
        if(!element || !isDestroyElement) return;
        todoStore.deleteTodo(element.getAttribute('data-id'))

        displayTodos();
    })
    
    document.querySelector('.clear-completed').addEventListener('click',function(e){
        todoStore.deleteCompleted();
        displayTodos();
    })

    document.querySelectorAll('.filtro').forEach(element => {
        element.addEventListener('click',(element)=>{
            document.querySelectorAll('.filtro').forEach(el => el.classList.remove('selected'))
            element.target.classList.add('selected')
            switch(element.target.text){
                case('Todos'):
                    console.log("Todos")
                    todoStore.setFilter(todoStore.Filters.All);
                break;
                case('Pendientes'):
                    console.log("Pendientes")
                    todoStore.setFilter(todoStore.Filters.Pending);
                break;
                case('Completados'):
                    console.log("Completados")
                    todoStore.setFilter(todoStore.Filters.Completed);
                break;
            }
            displayTodos();
        })
    })

}