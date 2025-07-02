// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements and store them in constants
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load existing tasks from Local Storage when the page loads
    loadTasks();

    // Add event listener to the Add Task button
    addButton.addEventListener('click', function() {
        addTaskFromInput();
    });

    // Add event listener for Enter key press on the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTaskFromInput();
        }
    });

    /**
     * Function to add a task from the input field
     * This function retrieves the input value and calls addTask
     */
    function addTaskFromInput() {
        // Get and trim the task text from the input field
        const taskText = taskInput.value.trim();
        
        // Check if the task text is not empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Add the task to the list and save to Local Storage
        addTask(taskText, true);
        
        // Clear the input field
        taskInput.value = '';
        
        // Focus back on the input field for better user experience
        taskInput.focus();
    }

    /**
     * Function to add a task to the list
     * @param {string} taskText - The text of the task to add
     * @param {boolean} save - Whether to save the task to Local Storage (default: true)
     */
    function addTask(taskText, save = true) {
        // Create a new list item element
        const listItem = document.createElement('li');
        listItem.className = 'new-task'; // Add class for animation
        
        // Create a span element for the task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        // Add click event listener to the remove button
        removeButton.addEventListener('click', function() {
            removeTask(listItem, taskText);
        });
        
        // Append the task text and remove button to the list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);
        
        // Append the list item to the task list
        taskList.appendChild(listItem);
        
        // Remove the animation class after animation completes
        setTimeout(() => {
            listItem.classList.remove('new-task');
        }, 300);
        
        // Save to Local Storage if required
        if (save) {
            saveTaskToStorage(taskText);
        }
        
        // Update the display (remove empty state if present)
        updateEmptyState();
    }

    /**
     * Function to remove a task from the list and Local Storage
     * @param {HTMLElement} listItem - The list item element to remove
     * @param {string} taskText - The text of the task to remove from storage
     */
    function removeTask(listItem, taskText) {
        // Add fade out animation
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateX(-10px)';
        
        // Remove the task after animation
        setTimeout(() => {
            // Remove the list item from the DOM
            taskList.removeChild(listItem);
            
            // Remove the task from Local Storage
            removeTaskFromStorage(taskText);
            
            // Update the display
            updateEmptyState();
        }, 200);
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
            addTask(taskText, false);
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