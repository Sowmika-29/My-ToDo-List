const input=document.querySelector(".input-box");
const button=document.querySelector(".add-button");
const todoList=document.querySelector(".todo-list");

loadTodos();

button.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteTodo);







function addTodo(event){
     event.preventDefault();


     const taskText = input.value.trim();
  
     if (taskText === "") {
       return;
     }
       
     const todoDiv=document.createElement("div");
     todoDiv.classList.add("todo-container");

     const todoItem=document.createElement("li");
     todoItem.classList.add("todo-item");
     todoItem.innerText=input.value;
     todoDiv.appendChild(todoItem);

     const deleteButton=document.createElement("button");
     deleteButton.classList.add("delete-btn");
     deleteButton.innerHTML='<i class="fa-solid fa-trash fa-sm"></i>';
     todoDiv.appendChild(deleteButton);

     const completeButton=document.createElement("button");
     completeButton.classList.add("complete-btn");
     completeButton.innerHTML='<i class="fa-solid fa-check fa-lg"></i>';
     todoDiv.appendChild(completeButton);

     todoList.appendChild(todoDiv);

     storeTodos();

     input.value=''; 

}

function deleteTodo(event){
     

     const item=event.target;
     if(item.classList[0]==="delete-btn"){
          const delItem=item.parentElement;
          delItem.remove();
          storeTodos();
     }
     if(item.classList[0]==="complete-btn"){
          const delItem=item.parentElement;
          delItem.classList.toggle("completed");
          if(delItem.classList.contains("completed")){
               item.remove();
          }
          storeTodos();
     }
}

function storeTodos(){
     const todos=[];
     const todoContainers= document.querySelectorAll(".todo-container");

     todoContainers.forEach(todoDiv => {
        const todoText = todoDiv.querySelector(".todo-item").innerText;
        const isCompleted = todoDiv.classList.contains("completed");
        todos.push({ text: todoText, completed: isCompleted });
     });

     localStorage.setItem("todos",JSON.stringify(todos));

}



function loadTodos() {
     const storedTodos = JSON.parse(localStorage.getItem("todos"));
 
     if (storedTodos) {
         storedTodos.forEach(todo => {
             const todoDiv = document.createElement("div");
             todoDiv.classList.add("todo-container");
             if (todo.completed) {
                 todoDiv.classList.add("completed"); 
             }
 
             const todoItem = document.createElement("li");
             todoItem.classList.add("todo-item");
             todoItem.innerText = todo.text;
             todoDiv.appendChild(todoItem);
 
             const deleteButton = document.createElement("button");
             deleteButton.classList.add("delete-btn");
             deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-sm"></i>';
             todoDiv.appendChild(deleteButton);
 
             if (!todo.completed) {
                 const completeButton = document.createElement("button");
                 completeButton.classList.add("complete-btn");
                 completeButton.innerHTML = '<i class="fa-solid fa-check fa-lg"></i>';
                 todoDiv.appendChild(completeButton);
             }
 
             todoList.appendChild(todoDiv);
         });
     }
 }
 
