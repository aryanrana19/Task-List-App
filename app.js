const form = document.querySelector(".form")
const taskInput = document.querySelector(".task-input")
const taskList = document.querySelector(".tasks")
const title = document.querySelector("h3")
const clear = document.querySelector(".clear-btn")
const filter = document.querySelector(".filter-task")

// LOAD TASKS
document.addEventListener("DOMContentLoaded", loadTasks)


form.addEventListener("submit", (addTask))

// ADDING A TASK
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a Task')
  }else{
    // CREATE A NEW TASK FIELD div
    const taskField = document.createElement("div")
    // ADD ITS CLASS
    taskField.className = "task-field"
    // CREATE TASK NAME ELEMENT
    const h3 = document.createElement("h3")

    h3.textContent = taskInput.value
    // console.log(taskInput.value)
    const a = document.createElement("a")
    a.className = 'delete-item'
    a.innerHTML = '<i class="fa-solid fa-xmark"></i>'

    // APPEND CHILD
    taskField.appendChild(h3)
    taskField.appendChild(a)
    
    // APPEND TASKFIELD IN FORM
    taskList.appendChild(taskField)

    // STORE IN LS
    storeTaskInLocalStorage(taskInput.value)
  }
  taskInput.value = ''
  e.preventDefault()
}

// REMOVE TASk
taskList.addEventListener("click", removeTask);
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm("Remove Task?")){
      e.target.parentElement.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// TASK DONE
// taskList.addEventListener("click", taskDone)
// function taskDone(e){
//   if(e.target.classList.contains('task-done')){
//     e.target.style = 'text-decoration: line-through;'
//   }
// }


// LOAD TASKS 
function loadTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create a new task field div
    const taskField = document.createElement("div");
    taskField.className = "task-field";
    
    // Create task name element
    const h3 = document.createElement("h3");
    h3.textContent = task;

    const a = document.createElement("a");
    a.className = 'delete-item';
    a.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    
    taskField.appendChild(h3);
    taskField.appendChild(a);

    taskList.appendChild(taskField);
  });
}

// STORE IN LS
function storeTaskInLocalStorage(task){
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// REMOVE FROM LS
function removeFromLocalStorage(taskItem){
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
    console.log(tasks)
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// CLEAR TASK
clear.addEventListener("click", function(){
  if(confirm("Are you sure?")){
    if(confirm("Remove all tasks?")){
      taskList.innerHTML = ''
      clearFromLocalStorage()
    }
  }
})

// CLEAR TASK FROM LOCAL STORAGE
function clearFromLocalStorage(){
  localStorage.clear()
}

// FILTER TASKS
filter.addEventListener("keyup", filterTasks)

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.task-field').forEach(function(taskField) {
    const item = taskField.firstElementChild.textContent;
    if(item.toLowerCase().indexOf(text) !== -1) {
      taskField.style.display = 'flex';
    }else {
      taskField.style.display = 'none';
    }
  });
}