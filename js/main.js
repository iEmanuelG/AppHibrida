
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



//Grupos

