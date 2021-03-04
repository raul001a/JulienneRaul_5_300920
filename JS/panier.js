// JavaScript source code

// déclaration des variables 
let name;
let price;
let ID;
let qtity;

let basket = JSON.parse(localStorage.getItem("basket")); // récupère basket dans le localStorage et le transforme en JSON
console.log(basket);

let basketLength = basket.length;
console.log(basketLength);

for (let i = 0; i < basketLength; i++) {

    let productDetailInBasket = basket[i]; // récupère le détail du produit en index 0
    console.log(productDetailInBasket);

    name = productDetailInBasket.name; // récupère le nom du produit en index i
    price = productDetailInBasket.price; // récupère le pric du produit en index i
    ID = productDetailInBasket.id; // récupère l'ID du produit en index i
    qtity = productDetailInBasket.quantity; // récupère l'ID du produit en index i
    console.log(name, price, ID, qtity);


    let tbody = document.getElementById('tbody');
    let tr = document.createElement("tr");
    tr.setAttribute("class", "table-success");
    tbody.appendChild(tr);

    // création des différentes colonnes
    let col1 = document.createElement("td");
    col1.setAttribute("class", "align-middle");
    col1.textContent = name; 
    tr.appendChild(col1);

    let col2 = document.createElement("td");
    col2.setAttribute("class", "align-middle");
    tr.appendChild(col2);
    let inputQtity = document.createElement("input");
    inputQtity.setAttribute("class", "form-control btn-success");
    inputQtity.setAttribute("type", "number");
    inputQtity.setAttribute("min", "1");
    inputQtity.setAttribute("max", "100");
    inputQtity.setAttribute("value", qtity);
    col2.appendChild(inputQtity);


    let col3 = document.createElement("td");
    col3.setAttribute("class", "align-middle");
    col3.textContent = price / 100 + " euros";
    tr.appendChild(col3);

    let col4 = document.createElement("td");
    col4.setAttribute("class", "align-middle");
    col4.textContent = (price / 100) * (inputQtity.value) + " euros";
    tr.appendChild(col4);

    let col5 = document.createElement("td");
    col5.setAttribute("class", "align-middle");
    tr.appendChild(col5);
    let button = document.createElement("button");
    button.setAttribute("class", "close");
    button.setAttribute("ID", ID);
    button.setAttribute("type", "button");
    button.innerHTML = "<span>&times;</span>";
    col5.appendChild(button);
}


// fonction pour supprimer la ligne quand appuie sur le petit bouton avec la croix
let suppr = document.getElementById(ID);
suppr.addEventListener('click', function () {
    console.log("j'ai cliqué sur l'id" + ID);
});



// vider le localStorage quand je clique sur le bouton vider le panier // attention cela ne met pas à jour le panier
let clearLocalStorage = document.getElementById("clearbasket");

clearLocalStorage.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
});