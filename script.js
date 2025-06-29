/**
 * To-Do List Application
 * Adds, displays, and removes tasks using DOM manipulation.
 */

document.addEventListener('DOMContentLoaded', function () {
  // ✅ Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  /**
   * ✅ Function to add a new task
   */
  function addTask() {
    // Get the user's input and trim whitespace
    const taskText = taskInput.value.trim();

    // If input is empty, alert the user
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    // When the remove button is clicked, delete the task
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append the button to the task item
    li.appendChild(removeBtn);

    // Append the task to the list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
  }

  // ✅ Add event listener for button click
  addButton.addEventListener('click', addTask);

  // ✅ Add event listener for Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // ✅ Invoke addTask once on DOM load as per instructions
  addTask(); // Optional behavior; may initialize with an empty task
});
