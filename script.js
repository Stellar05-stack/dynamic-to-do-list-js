// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load existing tasks from Local Storage when the page loads
    loadTasks();

    // Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();
        
        // Check if taskText is not empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Task Creation and Removal
        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        
        // Give it a class name of 'remove-btn' using classList.add
        removeBtn.classList.add('remove-btn');

        // Assign an onclick event to the remove button that removes the li element from taskList
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            // Also remove from Local Storage
            removeTaskFromStorage(taskText);
            updateEmptyState();
        };

        // Append the remove button to the li element
        li.appendChild(removeBtn);
        
        // Append the li to taskList
        taskList.appendChild(li);
        
        // Clear the task input field
        taskInput.value = '';
        
        // Save to Local Storage
        saveTaskToStorage(taskText);
        
        // Update the display
        updateEmptyState();
        
        // Focus back on the input field for better user experience
        taskInput.focus();
    }

    // Attach Event Listeners
    // Add event listener to addButton that calls addTask when clicked
    addButton.addEventListener('click', addTask);

    // Add event listener to taskInput for 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask
        if (event.key === 'Enter') {
            addTask();
        }
    });

    /**
     * Function to add a task to the list for loading from storage
     * @param {string} taskText - The text of the task to add
     * @param {boolean} save - Whether to save the task to Local Storage (default: true)
     */
    function addTaskFromStorage(taskText, save = false) {
        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        
        // Give it a class name of 'remove-btn' using classList.add
        removeBtn.classList.add('remove-btn');

        // Assign an onclick event to the remove button that removes the li element from taskList
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            // Also remove from Local Storage
            removeTaskFromStorage(taskText);
            updateEmptyState();
        };

        // Append the remove button to the li element
        li.appendChild(removeBtn);
        
        // Append the li to taskList
        taskList.appendChild(li);
        
        // Save to Local Storage if required
        if (save) {
            saveTaskToStorage(taskText);
        }
        
        // Update the display
        updateEmptyState();
    }

    /**
     * Function to save a task to Local Storage
     * @param {string} taskText - The task text to save
     */
    function saveTaskToStorage(taskText) {
        // Get existing tasks from Local Storage or initialize empty array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Add the new task to the array
        storedTasks.push(taskText);
        
        // Save the updated array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    /**
     * Function to remove a task from Local Storage
     * @param {string} taskText - The task text to remove
     */
    function removeTaskFromStorage(taskText) {
        // Get existing tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Find and remove the task from the array
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        
        // Save the updated array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    /**
     * Function to load tasks from Local Storage when the page loads
     */
    function loadTasks() {
        // Get tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Add each stored task to the list (without saving again to avoid duplication)
        storedTasks.forEach(taskText => {
            addTaskFromStorage(taskText, false);
        });
        
        // Update the display
        updateEmptyState();
    }

    /**
     * Function to update the empty state display
     * Shows a message when there are no tasks
     */
    function updateEmptyState() {
        // Remove existing empty state message
        const existingEmptyState = taskList.querySelector('.empty-state');
        if (existingEmptyState) {
            taskList.removeChild(existingEmptyState);
        }
        
        // Check if there are no tasks
        const taskItems = taskList.querySelectorAll('li:not(.empty-state)');
        if (taskItems.length === 0) {
            // Create and display empty state message
            const emptyStateDiv = document.createElement('div');
            emptyStateDiv.className = 'empty-state';
            emptyStateDiv.textContent = 'No tasks yet. Add one above!';
            taskList.appendChild(emptyStateDiv);
        }
    }

    /**
     * Function to clear all tasks (optional feature)
     * This function can be called to remove all tasks at once
     */
    function clearAllTasks() {
        // Remove all tasks from the DOM
        taskList.innerHTML = '';
        
        // Clear Local Storage
        localStorage.removeItem('tasks');
        
        // Update the display
        updateEmptyState();
    }

    // Optional: Add a clear all button (uncomment to enable)
    /*
    const clearAllButton = document.createElement('button');
    clearAllButton.textContent = 'Clear All Tasks';
    clearAllButton.style.marginTop = '10px';
    clearAllButton.style.width = '100%';
    clearAllButton.style.padding = '10px';
    clearAllButton.style.backgroundColor = '#6c757d';
    clearAllButton.style.color = 'white';
    clearAllButton.style.border = 'none';
    clearAllButton.style.borderRadius = '4px';
    clearAllButton.style.cursor = 'pointer';
    
    clearAllButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all tasks?')) {
            clearAllTasks();
        }
    });
    
    document.getElementById('todo-app').appendChild(clearAllButton);
    */

    // Focus on the input field when the page loads
    taskInput.focus();

    // Initialize empty state on load
    updateEmptyState();
});