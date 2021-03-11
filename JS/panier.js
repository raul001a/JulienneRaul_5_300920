// JavaScript source code

// déclaration des variables 
let name;
let price;
let productID;
let qtity;

let basket = JSON.parse(localStorage.getItem("basket")); // récupère basket dans le localStorage et le transforme en JSON
console.log(basket);

let basketLength = basket.length;
console.log(basketLength);

// boucle pour le remplissage du tableau

for (let i = 0; i < basketLength; i++) {

    let productDetailInBasket = basket[i]; // récupère le détail du produit en index 0
    console.log(productDetailInBasket);

    name = productDetailInBasket.name; // récupère le nom du produit en index i
    price = productDetailInBasket.price; // récupère le pric du produit en index i
    productID = productDetailInBasket.id; // récupère l'ID du produit en index i
    qtity = productDetailInBasket.quantity; // récupère l'ID du produit en index i
    console.log(name, price, productID, qtity);


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
    inputQtity.setAttribute("name", productID); // à voir pour changer avec une concatenation productID qqchose cf. ID du button
    inputQtity.setAttribute("min", "1");
    inputQtity.setAttribute("max", "100");
    inputQtity.setAttribute("value", qtity);
    col2.appendChild(inputQtity);

     // fonction pour mettre à jour le montant total de la ligne quand on change la quantité
    inputQtity.addEventListener('change', function () {
       
        console.log(inputQtity);
        console.log(this.name + " name/id de l'input modifié"); // récupère l'id du bouton qu'on a préalablement rempli avec avec productID

        // test pour modifier la value de l'input par la valeur saisir - attention voir si quand ce n'est pas un nombre
       inputQtity.setAttribute("value", event.target.value); // ok ca fonctionne mais ca ne met pas à jour direct le prix et faut encore le mettre dans le panier
        console.log(inputQtity); 

        let result = basket.find(x => x.id === this.name); // renvoie l'objet contenant l'ID cherché
        result.quantity = inputQtity.value; // on modifie la quantité par la valeur de l'input

        console.log(basket);
        let basket_json = JSON.stringify(basket); // transforme en texte l'array basket
        localStorage.setItem("basket", basket_json); // le renvoie dans le localStorage
        // ajouter qqchose pour mettre à jour la page
        

    });


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
    button.setAttribute("ID", productID); // à voir pour changer avec une concatenation productID qqchose cf. ID du button
    button.setAttribute("type", "submit");
    button.innerHTML = "<span>&times;</span>";
    col5.appendChild(button);

    // fonction pour supprimer la ligne quand appuie sur le petit bouton avec la croix // pas fini
    
    let suppr = tbody.getElementsByTagName('button'); // pour que cela ne sélectionne que les boutons de tbody
    let supprbtn = suppr[i];
    console.log(suppr);
    supprbtn.addEventListener('click', function (event) {
        event.preventDefault();
        console.log(supprbtn);
        console.log(this.id); // récupère l'id du bouton qu'on a préalablement rempli avec avec productID
        let idfilter = this.id;
        basket = basket.filter(x => x.id !== idfilter); // renvoit un tableau où on a enlevé l'objet qui contenait l'ID cliqué - à voir pour changer si on fait avec le name
        console.log(basket);
        let basket_json = JSON.stringify(basket); // transforme en texte l'array basket
        localStorage.setItem("basket", basket_json); // le renvoie dans le localStorage
        // ajouter qqchose pour mettre à jour la page

    });
    
}

// fin de la boucle pour le remplissage du tableau


// pour récupérer le montant global de la commande
var valeurInitiale = 0;
var somme = basket.reduce(
    (accumulateur, valeurCourante) => accumulateur + (valeurCourante.quantity * valeurCourante.price)
    , valeurInitiale
);

console.log(somme); 
let total = document.getElementById("total");
total.textContent = somme / 100 + " euros";


// deuxième version pour récupérer le montant
let sommetest = basket.map(function (x) {
    return x.price * x.quantity;
});

console.log(sommetest);
let sommetest2 = sommetest.reduce((a, b) => a + b, 0);
console.log(sommetest2);


// vider le localStorage quand je clique sur le bouton vider le panier // attention cela ne met pas à jour le panier
let clearLocalStorage = document.getElementById("clearbasket");

clearLocalStorage.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    // ajouter qqchose pour mettre à jout la page
});



