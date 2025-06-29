/**
 * Dynamic To-Do List Application
 * Handles adding, displaying, and removing tasks using advanced DOM manipulation.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
    // Retrieve and trim the input value
    const taskText = taskInput.value.trim();

    // Check if the input is empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button for the task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    // Assign onclick event to remove the task
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append the remove button to the list item
    li.appendChild(removeBtn);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
  }

  // Event listener for the Add Task button
  addButton.addEventListener('click', addTask);

  // Event listener for Enter key in the input field
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Optionally invoke addTask on DOMContentLoaded (as per instructions)
  addTask();
});