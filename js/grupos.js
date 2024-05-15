var groupsDiv = [];
//Insertar documentos en LocalStorage
document.addEventListener('DOMContentLoaded', function () {
    var groupListContainer = document.getElementById('carousel_grupos');
    var storedGroups = JSON.parse(localStorage.getItem('groups'));
    count = localStorage.getItem('count');
    for (let i = 0; i < storedGroups.length; i++) {

        var grupoHTML = `
        <a href="./grupo.html" onclick="Group_Opened('TitleID')">
            <div class="group_grupos1" style="background-color: Color;" id="open-group1">
            <p>Title</p>
            </div>
        </a>
        `;

        grupoHTML = grupoHTML.replace('TitleID',storedGroups[i].titulo);
        grupoHTML = grupoHTML.replace('Title',storedGroups[i].titulo);
        grupoHTML = grupoHTML.replace('Color',storedGroups[i].color);
        groupListContainer.innerHTML += grupoHTML;
    }

});

function Group_Opened(grupo){
    console.log(grupo);
    localStorage.setItem("Open-group",grupo);
}

//Click en Add Group
document.getElementById('floating-button').addEventListener('click', function () {
    var popUpGroup = document.getElementById('popUpGroup');
    popUpGroup.classList.remove('hidden');
    popUpGroup.style.display = 'flex';
});

//Add group
document.getElementById('save-group').addEventListener('click', function () {
    var titulo = document.getElementById('tituloGroup').value;
    var color = document.getElementById("bgcolor").value;

    var groupListContainer = document.getElementById('carousel_grupos');
    var grupoHTML = `
        <a href="./grupo.html">
            <div class="group_grupos1" style="background-color: Color;" id="open-group1">
            <p>Title</p>
            </div>
        </a>
        `;

    grupoHTML = grupoHTML.replace('Title',titulo);
    grupoHTML = grupoHTML.replace('Color',color);
    groupListContainer.innerHTML += grupoHTML;

    // Limpia los campos de entrada y oculta la ventana emergente
    document.getElementById('tituloGroup').value = '';
    document.getElementById('bgcolor').value = '#ffffff';
    document.getElementById('popUpGroup').style.display = 'none';
    var storedGroups = JSON.parse(localStorage.getItem('groups')) ?? [];
    groupsDiv = storedGroups;
    groupsDiv.push({ titulo, color }) 
    localStorage.setItem('groups', JSON.stringify(groupsDiv));
    color = '#ffffff';
});

document.getElementById('cancel-group').addEventListener('click', function () {
    document.getElementById('tituloGroup').value = '';
    document.getElementById('bgcolor').value = '#ffffff';
    document.getElementById('popUpGroup').style.display = 'none';
});