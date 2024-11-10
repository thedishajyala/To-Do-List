// Selecting necessary DOM elements
const todoList = document.getElementById('todo-list');
const addTaskButton = document.getElementById('add-task-button');
const dateElement = document.querySelector('.date');
const timeElement = document.querySelector('.time');

// Function to display the current date and time
function updateDateTime() {
    const now = new Date();

    // Format the date as "DD-MM-YYYY"
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    // Format the time as "HH:MM"
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    // Update the HTML elements with the formatted date and time
    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
}

// Call updateDateTime once to set the initial values
updateDateTime();

// Update the time every minute
setInterval(updateDateTime, 60000);

// Function to add a new task
function addTask() {
    // Create a new list item for the task
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    // Create label for the custom checkbox and text
    const label = document.createElement('label');
    label.classList.add('checkbox-container');

    // Create the checkbox input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleTaskCompletion);

    // Create custom checkbox span
    const customCheckbox = document.createElement('span');
    customCheckbox.classList.add('custom-checkbox');

    // Create the input field for task text
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.classList.add('task-input');
    taskInput.placeholder = "Enter task"; // Optional placeholder
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            taskInput.blur(); // Deselect input when pressing enter
        }
    });

    // Create the "Remove" button
    const removeButton = document.createElement('button');
    removeButton.textContent = "✗";
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
        todoList.removeChild(taskItem); // Remove the task item from the list
    });

    // Append checkbox and custom checkbox to label
    label.appendChild(checkbox);
    label.appendChild(customCheckbox);
    label.appendChild(taskInput);

    // Append label to the task item
    taskItem.appendChild(label);

    // Append the Remove button to the task item
    taskItem.appendChild(removeButton);

    // Add the new task item to the list
    todoList.appendChild(taskItem);

    // Focus on the new input field immediately
    taskInput.focus();
}


// Function to toggle task completion
function toggleTaskCompletion(event) {
    const checkbox = event.target;
    const taskLabel = checkbox.nextElementSibling.nextElementSibling; // Select the task input

    if (checkbox.checked) {
        taskLabel.classList.add('completed');
        taskLabel.disabled = true; // Disable editing if completed
    } else {
        taskLabel.classList.remove('completed');
        taskLabel.disabled = false; // Re-enable editing if unchecked
    }
}

// Event listener for the "Add" button
addTaskButton.addEventListener('click', addTask);


