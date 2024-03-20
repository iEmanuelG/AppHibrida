


//Splash Screen
document.addEventListener('DOMContentLoaded', function () {
    const splashContainer = document.querySelector('.splash-container');
    const easy = document.querySelector('.easy');
    const homeHeader = document.querySelector('.home-header');
    setTimeout(function () {
        easy.classList.add('fadeOut');
        setTimeout(function () {
            easy.textContent = 'E-Note';
            easy.classList.remove('fadeOut');
        }, 200); // Espera 0.1s para cambiar el texto
    }, 1500);
    setTimeout(function () {
        splashContainer.classList.add('fadeOut');
        homeHeader.classList.add('fadeIn');
    }, 3000);

});


//add task

document.getElementById('floating-button').addEventListener('click', function () {
    document.getElementById('fecha').innerText = new Date().toLocaleDateString();
    var popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    popup.style.display = 'flex';

});

document.getElementById('add-task').addEventListener('click', function () {
    var titulo = document.getElementById('titulo').value;
    var texto = document.getElementById('texto').value;

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


    contentTarea.appendChild(tituloTarea);
    contentTarea.appendChild(fechaP);
    contentTarea.appendChild(textTarea);
    tareaDiv.appendChild(contentTarea);
    document.querySelector('.tareas-container').appendChild(tareaDiv);

    // Limpia los campos de entrada y oculta la ventana emergente
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
    document.getElementById('popup').style.display = 'none';
});

document.getElementById('cancel-task').addEventListener('click', function () {
    document.getElementById('titulo').value = '';
    document.getElementById('texto').value = '';
    document.getElementById('popup').style.display = 'none';
});