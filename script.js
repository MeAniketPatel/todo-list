// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task when button is clicked
addTaskBtn.addEventListener('click', addTask);

// Allow pressing Enter to add task
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!'); // Simple user feedback
        return;
    }

    // Create task object with unique ID
    const task = {
        id: Date.now(), // Using timestamp for unique IDs
        text: taskText
    };

    // Save and render the task
    saveTask(task);
    renderTask(task);

    // Clear input field
    taskInput.value = '';
}

// Function to render a task in the list
function renderTask(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id; // Store ID for deletion
    li.innerHTML = `
        <span>${task.text}</span>
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
}

// Function to save task to localStorage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(renderTask);
}

// Function to delete a task
function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Refresh the list
    taskList.innerHTML = '';
    loadTasks();
}