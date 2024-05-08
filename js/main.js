var groupsDiv = [];
var tasksDiv = [];

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



/*document.getElementById("bgcolor").addEventListener("input", function () {
    document.body.style.backgroundColor = this.value;
}, false);*/

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

        // Limpia los campos de entrada y oculta la ventana emergente
        document.getElementById('tituloGroup').value = '';
        document.getElementById('bgcolor').value = '#ffffff';
        document.getElementById('popUpGroup').style.display = 'none';
        groupsDiv = storedGroups;
        groupsDiv.push({ titulo, color });
        localStorage.setItem('groups', JSON.stringify(groupsDiv));
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

    groupDiv.addEventListener('dragover', function (event) {
        event.preventDefault(); // Necesario para permitir soltar
    });
    groupDiv.addEventListener('drop', function (event) {
        event.preventDefault(); // Evita la acción por defecto (como abrir un enlace)

        // Obtén el id del elemento arrastrado desde los datos de la transferencia
        var id = event.dataTransfer.getData('text');
        var storedTask = JSON.parse(localStorage.getItem('tasks'));
        var tasks = [];
        tasks = storedTask;


        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]["titulo"] == id) {
                tasks[i]["grupo"] = titulo;
                console.log(tasks[i]["grupo"]);
            }
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));

    });

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
    var storedTask = JSON.parse(localStorage.getItem('tasks')) ?? [];
    tasksDiv = storedTask;
    tasksDiv.push({ titulo, texto, "fecha": fechaActual.toLocaleDateString(), "grupo": "none", "chacked": false });
    localStorage.setItem('tasks', JSON.stringify(tasksDiv));

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
    tareaDiv.appendChild(contentTarea);
    tareaDiv.setAttribute('data-id', titulo);
    tareaDiv.setAttribute('draggable', 'true');
    tareaDiv.addEventListener('dragstart', handleDragStart);
    //tareaDiv.addEventListener('dragend', handleDragEnd);
    //tareaDiv.addEventListener('dragend', handleDragEnd);
    //tareaDiv.addEventListener('drop', handleDrop);

    return tareaDiv;
}

var dragSrcEl = null;

function handleDragStart(e) {
    this.style.opacity = '0.8';

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.target.dataset.id);
    console.log(e.target.dataset.id);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
}
/*
function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }


}
*/
function handleDragEnd(e) {
    this.style.opacity = '1';

    items.forEach(function (item) {
        item.classList.remove('over');
    });
}