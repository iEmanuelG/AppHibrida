var grupo = localStorage.getItem("Open-group");

//Titulo
const titulo = `<h2>${grupo}</h2>`;
document.getElementById('group').innerHTML += titulo;
Load_Tasks();

function Load_Tasks(){
    var groupListContainer = document.getElementById('carousel_grupo');
    var storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(storedTasks!==null){
        for (let i = 0; i < storedTasks.length; i++) {
            if(storedTasks[i].grupo === grupo){
                var grupoHTML = `
                <div class="note_grupo" id="open-note">
                    <input type="checkbox" name="checkbox" value="0" Check>
                    <div class="note_grupo_inside">
                        <div class="header_note_grupo">
                            <h4>Title</h4>
                            <h4>Date</h4>
                        </div>
                        <p>
                            Text
                        </p>
                    </div>
                </div>
                `
        
                grupoHTML = grupoHTML.replace('Title',storedTasks[i].titulo);
                grupoHTML = grupoHTML.replace('Date',storedTasks[i].fecha);
                grupoHTML = grupoHTML.replace('Text',storedTasks[i].texto);
                var check = storedTasks[i].check;
                console.log(check);
                if(check)
                    grupoHTML = grupoHTML.replace('Check','checked');
                else 
                    grupoHTML = grupoHTML.replace('Check',"");
                groupListContainer.innerHTML += grupoHTML;
            }
        }
    }
    console.log("hola");
}

document.getElementById('add-task').addEventListener('click', function(){
    const titulo = document.getElementById('titulo').value; 
    const fecha = document.getElementById('fecha').textContent; 
    const texto = document.getElementById('texto').value; 
    const check = false;

    var storedGroups = JSON.parse(localStorage.getItem('tasks')) ?? [];
    groupsDiv = storedGroups;
    groupsDiv.push({ titulo, fecha, texto, grupo, check }) ;
    localStorage.setItem('tasks', JSON.stringify(groupsDiv));
}); 

//AL PULSAR EL BUTTON DE AGREGAR
document.getElementById('floating-button').addEventListener('click', function () {
    document.getElementById('fecha').innerText = new Date().toLocaleDateString();
    var popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    popup.style.display = 'flex';
    console.log("Hola");

});

document.getElementById('add-task').addEventListener('click', function () {
    var titulo = document.getElementById('titulo').value;
    var texto = document.getElementById('texto').value;

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
    const date = document.createElement("h4");
    date.classList.add('fecha-tarea');
    date.textContent = fechaActual.toLocaleDateString();
    date.innerText = "13/03/2024"; // Replace with your actual date

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
    newNote.appendChild(innerDiv);
    document.querySelector('.carousel_grupo').appendChild(newNote);

    // Limpia los campos de entrada y oculta la ventana emergente
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
    document.getElementById('popup').style.display = 'none';



    /*
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
    fechaP.textContent = fechaActual.toLocaleDateString();

    var textTarea = document.createElement('div');
    textTarea.classList.add('text-tarea');

    var textoP = document.createElement('p');
    textoP.textContent = texto;
    textTarea.appendChild(textoP);

    var contentTarea = document.createElement('div');
    contentTarea.classList.add('content-tarea');

    const newNote = document.createElement("div");
  newNote.classList.add("note_grupo");
  newNote.id = "open-note";

  */


});

document.getElementById('cancel-task').addEventListener('click', function () {
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
    document.getElementById('popup').style.display = 'none';
});