
document.addEventListener('DOMContentLoaded', function () {
    const splashContainer = document.querySelector('.splash-container');
    const easy = document.querySelector('.easy');

    setTimeout(function () {
        easy.classList.add('fadeOut');
        setTimeout(function () {
            easy.textContent = 'E-Note';
            easy.classList.remove('fadeOut');
        }, 200); // Espera 0.1s para cambiar el texto
    }, 1500);
    setTimeout(function () {
        splashContainer.classList.add('fadeOut');
    }, 3000);

});
