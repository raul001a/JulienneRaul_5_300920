// JavaScript source code

// vider le localStorage quand je clique sur le bouton vider le panier
let clearLocalStorage = document.getElementById("clearbasket");

clearLocalStorage.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
});