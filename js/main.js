var groupsDiv = [];
var tasksDiv = [];
var draggedElementId;

//notas
document.addEventListener('DOMContentLoaded', function () {
    var storedGroups = JSON.parse(localStorage.getItem('groups')) ?? [];
    showTasks();
    if (storedGroups.length != null) {
        for (let i = 0; i < storedGroups.length; i++) {
            document.getElementById('group-list').appendChild(createGroup(storedGroups[i]["titulo"], storedGroups[i]["color"]));
        }
    }
});

function showTasks() {
    var tareasContainer = document.querySelector('.tareas-container');
    tareasContainer.innerHTML = '';
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
    if (storedTasks.length != null) {
        for (let i = 0; i < storedTasks.length; i++) {
            if (storedTasks[i]["grupo"] == "none") {
                var tarea = createNota(storedTasks[i]["titulo"], storedTasks[i]["texto"]);
                tareasContainer.appendChild(tarea);
            }
        }
    }
}


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
    var popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    popup.style.display = 'flex';

});



document.getElementById('add-task').addEventListener('click', function () {
    var fechaActual = new Date();
    var titulo = document.getElementById('titulo').value;
    var texto = document.getElementById('texto').value;

    document.querySelector('.tareas-container').appendChild(createNota(titulo, texto));

    // Limpia los campos de entrada y oculta la ventana emergente
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
    document.getElementById('popup').style.display = 'none';

    //localstorage
    addTaskLocalhost(titulo, texto, fechaActual.toLocaleDateString(), "none", false);

});

document.getElementById('cancel-task').addEventListener('click', function () {
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
    document.getElementById('popup').style.display = 'none';
});

function createNota(titulo, texto) {
    var newNote = document.createElement('div');
    newNote.classList.add('note_grupo');

    // Create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    checkbox.value = "0";

    // Create the inner div
    const innerDiv = document.createElement("div");
    innerDiv.classList.add("note_grupo_inside");

    // Create the header div
    const header = document.createElement("div");
    header.classList.add("header_note_grupo");

    // Create the two h4 elements for title and date
    const title = document.createElement("h4");
    title.textContent = titulo;
    header.appendChild(title);

    var fechaActual = new Date();
    var date = document.createElement('div');
    date.classList.add('fecha-tarea');
    date.textContent = fechaActual.toLocaleDateString();

    // Create the paragraph element
    const paragraph = document.createElement("p");
    paragraph.classList.add('text-tarea');
    paragraph.textContent = texto;
    innerDiv.appendChild(paragraph);


    header.appendChild(title);
    header.appendChild(date);
    innerDiv.appendChild(header);
    innerDiv.appendChild(paragraph);
    newNote.appendChild(checkbox);
    newNote.appendChild(svgFolderGenerator(titulo));

    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            newNote.style.textDecoration = 'line-through';
            updateTaskLocalhost(titulo, true, 'checked');
            newNote.style.opacity = '0.5';
        } else {
            newNote.style.textDecoration = 'none';
            updateTaskLocalhost(titulo, false, 'checked');
            newNote.style.opacity = '1';
        }
    });

    newNote.appendChild(innerDiv);

    return newNote;
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


function svgFolderGenerator(titleTask) {
    let button = document.createElement('button');

    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M13 9h-2v3H8v2h3v3h2v-3h3v-2h-3z"></path><path d="M20 5h-8.586L9.707 3.293A.996.996 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"></path></svg>';
    button.classList.add('folder-button');

    button.addEventListener('click', function () {
        showGroupList(titleTask);
        var popUpGroup = document.getElementById('popUpSelectGroup');
        popUpGroup.classList.remove('hidden');
        popUpGroup.style.display = 'flex';

    });

    return button;
}

function showGroupList(titleTask) {
    var groupList = document.getElementById('group-list-select');

    var storedGroups = JSON.parse(localStorage.getItem('groups')) ?? [];

    for (let i = 0; i < storedGroups.length; i++) {
        var button = document.createElement('button');
        document.getElementById('close-select-group').addEventListener('click', closeSelectGroup);

        var grupo = storedGroups[i]["titulo"];

        button.innerText = grupo;

        button.style.backgroundColor = storedGroups[i]["color"];


        button.classList.add('group-button');

        storedGroups[i]["color"] == '#ffffff' ? button.style.border = 'solid 1px var(--third-color)' : button.style.border = 'none';

        button.addEventListener('click', function () {
            updateTaskLocalhost(titleTask, grupo, 'grupo');
            showTasks();
            closeSelectGroup();
        });

        groupList.appendChild(button);
    }
}

function closeSelectGroup() {
    document.getElementById('popUpSelectGroup').style.display = 'none';
    document.getElementById('group-list-select').innerHTML = '';
}
