/**
 * Dynamic To-Do List Application
 * Handles adding, displaying, and removing tasks using advanced DOM manipulation.
 */

document.addEventListener('DOMContentLoaded', function () {
  // ✅ Select DOM elements
  const addButton = document.getElementById('add-task'); // Button to add task
  const taskInput = document.getElementById('task-input'); // Input field for task text
  const taskList = document.getElementById('task-list'); // UL to display tasks

  // ✅ Function to add a new task
  function addTask() {
    // Retrieve and trim the input value
    const taskText = taskInput.value.trim();

    // Check if input is empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new <li> element
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a "Remove" button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    // Remove task when button is clicked
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append button to <li>, then <li> to <ul>
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
  }

  // ✅ Click event on "Add Task" button
  addButton.addEventListener('click', addTask);

  // ✅ Allow pressing "Enter" to add task
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // ❌ Do NOT call addTask() on load — removed
});
