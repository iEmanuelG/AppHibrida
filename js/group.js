
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.home-header').classList.add('fadeIn');
    var groupListContainer = document.getElementById('group-list');
    // Retrieve groups from local storage
    var storedGroups = JSON.parse(localStorage.getItem('groups'));

    for (let i = 0; i < storedGroups.length; i++) {

        var groupDiv = document.createElement('div');
        groupDiv.classList.add('group');
        groupDiv.style.backgroundColor = storedGroups[i].color;

        var tituloGroup = document.createElement('p');
        tituloGroup.textContent = storedGroups[i].titulo;
        groupDiv.appendChild(tituloGroup);

        groupListContainer.appendChild(groupDiv);

    }

});