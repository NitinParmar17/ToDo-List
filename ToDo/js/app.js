// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo); // addtodo is function called
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions

function addTodo(event) {  // event is click
    // Prevent form from submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");     // class of div tag created

    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;     // adding the value taken from input
    newTodo.classList.add('todo-item');
    
    todoDiv.appendChild(newTodo);    


    //ADD todo to localstorage
    saveLocalTodos(todoInput.value);


    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; // adding button icon
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // CHECK TRASH BUTTON 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // adding button icon
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // APPEND this div TO todo-list
    todoList.appendChild(todoDiv);       // adding div to the todo-list

    // Clear Todo input value;
    todoInput.value = "";         // after clicking on todobutton input area will become empty
 
}

function deleteCheck(e) {   // e is click
    // console.log(e.target);      // to check what is clicked 
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === 'trash-btn')
    {
        const todo = item.parentElement;    // it will give div tag 
        // ANIMATION
        todo.classList.add("fall");     // this class is only for animation
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {  // transitionend vent will occur after completion of css transition
            todo.remove();
        });
    }

    // CHECK MARK
    if(item.classList[0] === 'complete-btn')
    {
        const todo = item.parentElement;  // parent is div tag
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) { 
    const todos = todoList.childNodes;     // gives array of options
    // console.log(todos);      

    todos.forEach(function(todo) {
        switch(e.target.value)   // e.target.value will give values of the option clicked from dropdowwn list
        {
            case "all":  
                todo.style.display = "flex" ;
                break;

            case "completed":
                if(todo.classList.contains('completed'))
                {
                    todo.style.display = "flex";
                }    
                else
                {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains('completed'))
                {
                    todo.style.display = "flex";
                }    
                else
                {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocalTodos(todo) {    // todo is input value
    // Check if any todo already exists or not
    let todos;
    if(localStorage.getItem('todos') === null)  // todos is name of section conatining the list
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos')); //it will give an array
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos')); //it will give an array
    }

    todos.forEach(function(todo) {
        // console.log("hello");
         // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todo;
    newTodo.classList.add('todo-item');
    
    todoDiv.appendChild(newTodo);

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; // adding button icon
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // CHECK TRASH BUTTON 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // adding button icon
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // APPEND this div TO todo-list
    todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos')); //it will give an array
    }

    const todoIndex = todo.children[0].innerText;   // it will give the list item
    // console.log(todo.children[0].innerText);
    todos.splice(todos.indexOf(todoIndex), 1);   // removes 1 item from local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}