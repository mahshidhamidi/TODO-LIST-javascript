
function loadTasks() {
    readTasks()
        .then(tasks => {
            tasks.forEach(task => {
                createTaskElement(task.task);
            });
        }).catch(error => {
            console.error(error);
        });
}

function createTaskElement(task) {

    const li = document.createElement('li');

    const span = document.createElement('span');

    const div = document.createElement('div');
    div.className = 'todo-btns';


    const deleteButton = document.createElement('button');
    const updateButton = document.createElement('button');

    li.appendChild(span);
    li.appendChild(div);

    div.appendChild(deleteButton);
    div.appendChild(updateButton);

    span.textContent = task;

    deleteButton.className = "todo-tools remove-btn";
    updateButton.className = "todo-tools update-btn";

    deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
    updateButton.innerHTML = "<i class='fa fa-pencil-alt'></i>";

    deleteButton.addEventListener('click', function (event) {
        li.remove();
        deleteTask(task);
    });

    updateButton.addEventListener('click', function (event) {
        const newValue = prompt('enter new task', task);
        if (newValue) {
            li.childNodes[0].textContent = newValue;
            updateTask(task, newValue);
        }
    });

    document.getElementById('todo-list').appendChild(li);


}

window.onload = loadTasks


document.getElementById("todo-form").addEventListener('submit', function (event) {
    event.preventDefault();

    const input = document.getElementById('todo-input');

    const inputValue = input.value;

    if (!inputValue) {
        alert('Please enter the task!');
        return;
    }

    readTasks().then(tasks => {
        const index = tasks.indexOf(inputValue);
        let duplicated = index > -1;
        if (duplicated)
            return;
        else {
            createTaskElement(inputValue);
            createTask(inputValue);
            input.value = '';

        }
    });
});


const API_URL = 'http://localhost:3000';


function createTask(task) {
    fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })
        .then(response => response.text())
        .then(message => {
            console.log(message);
        }
        );
}

function readTasks() {
    return fetch(`${API_URL}/tasks`)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
}

function updateTask(task, newTask) {
    fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTask })
    })
        .then(response => response.text())
        .then(message => {
            console.log(message);
        }
        ).catch(error => {
            console.error(error);
        });

}

function deleteTask(task) {
    fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'DELETE'
    })
        .then(response => response.text())
        .then(message => {
            console.log(message);
        }
        ).catch(error => {
            console.error(error);
        });
}

 







