var groupsDiv = [];
var tasksDiv = [];
var draggedElementId;

//notas
document.addEventListener('DOMContentLoaded', function () {
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
    var storedGroups = JSON.parse(localStorage.getItem('groups')) ?? [];
    if (storedTasks.length != null) {
        for (let i = 0; i < storedTasks.length; i++) {
            if (storedTasks[i]["grupo"] == "none")
                document.querySelector('.tareas-container').appendChild(createNota(storedTasks[i]["titulo"], storedTasks[i]["texto"]));
        }
    }
    if (storedGroups.length != null) {
        for (let i = 0; i < storedGroups.length; i++) {
            document.getElementById('group-list').appendChild(createGroup(storedGroups[i]["titulo"], storedGroups[i]["color"]));
        }
    }
});


//add group
document.getElementById('add-group').addEventListener('click', function () {
    var popUpGroup = document.getElementById('popUpGroup');
    popUpGroup.classList.remove('hidden');
    popUpGroup.style.display = 'flex';
});

document.getElementById('save-group').addEventListener('click', function () {
    var titulo = document.getElementById('tituloGroup').value;
    var color = document.getElementById("bgcolor").value;
    var storedGroups = JSON.parse(localStorage.getItem('groups')) ?? [];
    var exist = false;

    for (let i = 0; i < storedGroups.length; i++) {
        if (storedGroups[i]["titulo"] == titulo) {
            exist = true;
        }
    }
    if (exist) {
        alert('El grupo ya existe');
    } else {

        document.querySelector('.carousel').appendChild(createGroup(titulo, color));
        addGroupLocalhost(titulo, color);

        // Limpia los campos de entrada y oculta la ventana emergente
        document.getElementById('tituloGroup').value = '';
        document.getElementById('bgcolor').value = '#ffffff';
        document.getElementById('popUpGroup').style.display = 'none';

        color = '#ffffff';
    }
});

document.getElementById('cancel-group').addEventListener('click', function () {
    document.getElementById('tituloGroup').value = '';
    document.getElementById('bgcolor').value = '#ffffff';
    document.getElementById('popUpGroup').style.display = 'none';
});

function createGroup(titulo, color) {
    var groupDiv = document.createElement('div');
    groupDiv.classList.add('group');
    groupDiv.style.backgroundColor = color;

    var tituloGroup = document.createElement('p');
    tituloGroup.textContent = titulo;
    groupDiv.appendChild(tituloGroup);

    return groupDiv;

}

//add task

document.getElementById('floating-button').addEventListener('click', function () {
    document.getElementById('fecha').innerText = new Date().toLocaleDateString();
    var popUpNote = document.getElementById('popUpNote');
    popUpNote.classList.remove('hidden');
    popUpNote.style.display = 'flex';

});



document.getElementById('add-task').addEventListener('click', function () {
    var fechaActual = new Date();
    var titulo = document.getElementById('titulo').value;
    var texto = document.getElementById('texto').value;

    document.querySelector('.tareas-container').appendChild(createNota(titulo, texto));

    // Limpia los campos de entrada y oculta la ventana emergente
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
    document.getElementById('popUpNote').style.display = 'none';

    //localstorage
    addTaskLocalhost(titulo, texto, fechaActual.toLocaleDateString(), "none", false);

});

document.getElementById('cancel-task').addEventListener('click', function () {
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
    document.getElementById('popUpNote').style.display = 'none';
});

function createNota(titulo, texto) {
    var tareaDiv = document.createElement('div');
    tareaDiv.classList.add('tarea');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    tareaDiv.appendChild(checkbox);

    var tituloTarea = document.createElement('div');
    tituloTarea.classList.add('titulo-tarea');

    var tituloH2 = document.createElement('h2');
    tituloH2.textContent = titulo;
    tituloTarea.appendChild(tituloH2);

    var fechaActual = new Date();
    var fechaP = document.createElement('div');
    fechaP.classList.add('fecha-tarea');
    var hora = fechaActual.getHours();
    var minuto = fechaActual.getMinutes();
    var segundo = fechaActual.getSeconds();
    fechaP.textContent = `${hora}:${minuto}:${segundo}  - ` + fechaActual.toLocaleDateString();

    var textTarea = document.createElement('div');
    textTarea.classList.add('text-tarea');

    var textoP = document.createElement('p');
    textoP.textContent = texto;
    textTarea.appendChild(textoP);

    var contentTarea = document.createElement('div');
    contentTarea.classList.add('content-tarea');


    contentTarea.appendChild(tituloTarea);
    contentTarea.appendChild(fechaP);
    contentTarea.appendChild(textTarea);
    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            contentTarea.style.textDecoration = 'line-through';
            updateTaskLocalhost(titulo, true, 'checked');
            contentTarea.style.opacity = '0.5';
        } else {
            contentTarea.style.textDecoration = 'none';
            updateTaskLocalhost(titulo, false, 'checked');
            contentTarea.style.opacity = '1';
        }
    });
    tareaDiv.appendChild(contentTarea);

    return tareaDiv;
}


function addTaskLocalhost(titulo, texto, fecha, grupo, checked) {
    var storedTask = JSON.parse(localStorage.getItem('tasks')) ?? [];
    tasksDiv = storedTask;
    tasksDiv.push({ titulo, texto, "fecha": fecha, "grupo": grupo, "checked": checked });
    localStorage.setItem('tasks', JSON.stringify(tasksDiv));
}

function addGroupLocalhost(titulo, color) {
    var storedGroups = JSON.parse(localStorage.getItem('groups')) ?? [];
    groups = storedGroups;
    groups.push({ titulo, color });
    localStorage.setItem('groups', JSON.stringify(groups));
}

function updateTaskLocalhost(titulo, data, dataToChange) {
    var storedTask = JSON.parse(localStorage.getItem('tasks'));
    var tasks = [];
    tasks = storedTask;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]["titulo"] == titulo) {
            tasks[i][dataToChange] = data;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateGroupLocalhost(titulo, data, dataToChange) {
    var storedGroups = JSON.parse(localStorage.getItem('groups'));
    var groups = [];
    groups = storedGroups;

    for (let i = 0; i < groups.length; i++) {
        if (groups[i]["titulo"] == titulo) {
            groups[i][dataToChange] = data;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}