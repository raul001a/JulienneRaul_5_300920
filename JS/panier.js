// JavaScript source code

// d�claration des variables 
let name;
let price;
let productID;
let qtity;

let basket = JSON.parse(localStorage.getItem("basket")); // r�cup�re basket dans le localStorage et le transforme en JSON
console.log(basket);

// fonction pour v�rifier l'�tat du panier pour apparition section panier vide ou section avec tableau et formulaire
function checkBasket() {
    if (basket === null || basket.length === 0) { // soit basket n'a pas �t� cr�� dans le local storage soit il n'y a pas d'objet par ex si on a supprim� toutes les lignes
        console.log("panier vide");
        let commande = document.getElementById('commande');
        commande.setAttribute("class", "d-none"); // on fait dispara�tre le tableau et le formulaire
        let emptybasket = document.getElementById('emptybasket');
        emptybasket.classList.remove("d-none");
    }
    else {
        
        emptybasket.setAttribute("class", "d-none"); // on fait dispara�tre la section panier vide
    }
};

checkBasket();

let basketLength = basket.length;
console.log(basketLength);

// boucle pour le remplissage du tableau


for (let i = 0; i < basketLength; i++) {

    let productDetailInBasket = basket[i]; // r�cup�re le d�tail du produit en index 0
    console.log(productDetailInBasket);

    name = productDetailInBasket.name; // r�cup�re le nom du produit en index i
    price = productDetailInBasket.price; // r�cup�re le pric du produit en index i
    productID = productDetailInBasket.id; // r�cup�re l'ID du produit en index i
    qtity = productDetailInBasket.quantity; // r�cup�re la quantit� du produit en index i
    console.log(name, price, productID, qtity);


    let tbody = document.getElementById('tbody');
    let tr = document.createElement("tr");
    tr.setAttribute("class", "table-success");
    tbody.appendChild(tr);

    // cr�ation des diff�rentes colonnes
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
    inputQtity.setAttribute("name", productID); // � voir pour changer avec une concatenation productID qqchose cf. ID du button
    inputQtity.setAttribute("min", "1");
    inputQtity.setAttribute("max", "100");
    inputQtity.setAttribute("value", qtity);
    col2.appendChild(inputQtity);

     // fonction pour mettre � jour le montant total de la ligne quand on change la quantit�
    inputQtity.addEventListener('change', function () {
       
        console.log(inputQtity);
        console.log(this.name + " name/id de l'input modifi�"); // r�cup�re l'id du bouton qu'on a pr�alablement rempli avec avec productID

        // modifier la value de l'input par la valeur saisir - attention voir si quand ce n'est pas un nombre
        inputQtity.setAttribute("value", event.target.value); 
        console.log(inputQtity); 

        let result = basket.find(x => x.id === this.name); // renvoie l'objet contenant l'ID cherch�
        result.quantity = inputQtity.value; // on modifie la quantit� par la valeur de l'input

        console.log(basket);
        let basket_json = JSON.stringify(basket); // transforme en texte l'array basket
        localStorage.setItem("basket", basket_json); // le renvoie dans le localStorage

        //met � jour le prix total de la ligne
        col4.textContent = (price / 100) * (inputQtity.value) + " euros";

        //relance la fonction pour calculer le montant total de la commande
        sumCalc();
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
    button.setAttribute("ID", productID); // � voir pour changer avec une concatenation productID qqchose cf. ID du button
    button.setAttribute("type", "button"); // les diff�rents types de bouton
    button.innerHTML = "<span>&times;</span>";
    col5.appendChild(button);

    // fonction pour supprimer la ligne quand appuie sur le petit bouton avec la croix // pas fini
    
    let suppr = tbody.getElementsByTagName('button'); // pour que cela ne s�lectionne que les boutons de tbody
    let supprbtn = suppr[i];
    console.log(suppr);
    supprbtn.addEventListener('click', function () {
       
        console.log(supprbtn);
        console.log(this.id); // r�cup�re l'id du bouton qu'on a pr�alablement rempli avec avec productID
        let idfilter = this.id;
        basket = basket.filter(x => x.id !== idfilter); // renvoit un tableau o� on a enlev� l'objet qui contenait l'ID cliqu� - � voir pour changer si on fait avec le name
        console.log(basket);
        let basket_json = JSON.stringify(basket); // transforme en texte l'array basket
        localStorage.setItem("basket", basket_json); // le renvoie dans le localStorage
        // supprimer la ligne contenant le produit
        tr.remove();
        //relance la fonction pour calculer le montant total de la commande
        sumCalc();
        // v�rifie si le panier est vide 
        checkBasket();  

    });
    
}

// fin de la boucle pour le remplissage du tableau


// pour r�cup�rer le montant global de la commande

// calcul la somme de chaque instance de l'array presomme
let somme 
function sumCalc() {
    // cr�e un array de prix * quantit� de chaque produit dans basket
    let presomme = basket.map(function (x) {
        return x.price * x.quantity;
    });
    console.log(presomme);
    // fait la somme de chaque instance de l'array
    somme = presomme.reduce((a, b) => a + b, 0);
    console.log(somme);
    let total = document.getElementById("total");
    total.textContent = somme / 100 + " euros";
};

sumCalc();

// fin calcul montant global

// vider le localStorage quand je clique sur le bouton vider le panier 
let clearLocalStorage = document.getElementById("clearbasket");

clearLocalStorage.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear(); // vide le localstorage
    // ajoute et enl�ve les classes d-none � commande et emptybasket
    let commande = document.getElementById('commande');
    commande.setAttribute("class", "d-none"); // on fait dispara�tre le tableau et le formulaire
    let emptybasket = document.getElementById('emptybasket');
    emptybasket.classList.remove("d-none");
    
});


 // v�rifier sur panier et sur les autres pages la balise a avec un role button




// cr�ation de l'objet � envoyer � l'API
let prenom = document.getElementById('prenom').value;
let nom = document.getElementById('nom').value;
let adresse = document.getElementById('adresse').value 
let email = document.getElementById('email').value
let ville = document.getElementById('ville').value

let products = basket.map(function (x) {
    return x.id;
});

let order = {
    contact: {
        firstName: prenom,
        lastName: nom,
        address: adresse,
        city: ville,
        email: email,
    },
    products: products,
}

console.log(order);
console.log(JSON.stringify(order));


//  requ�te fetch et post

fetch("http://localhost:3000/api/cameras/order", {
    method: 'POST',
    body: JSON.stringify(order), // transforme order en JSON
    headers: { 'Content-Type': 'application/json; charset=utf-8' }, // a demander 
})
    .catch(() => {
        console.log(error)
    })
    .then(function (reponse) {
        return reponse.json();
    })
    .then(function (result) {
        console.log(result);
    })



