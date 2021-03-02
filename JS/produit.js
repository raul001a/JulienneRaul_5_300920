// JavaScript source code


// déclaration des variables utilisées dans la fonction cardFull puis dans secondApiRequest
let productID;
let productName;
let productPrice;
let productDescription;
let productImage;
let lensesNb;
let productLenses;

// fonction pour remplir la card 
function cardFull() {

    console.log("test création fonction cardFull");

    // fait apparaître la carte si l'API a mis du temps à répondre
    let productHide = document.getElementById("productdetail");
    productHide.classList.remove("d-none");

    // ajoute les différents éléments de l'API dans les différents éléments selon leur ID

    document.getElementById('productName').textContent = productName;
    document.getElementById('productDescription').textContent = productDescription;
    document.getElementById('productPrice').textContent = productPrice / 100 + " euros";
    document.getElementById('productImage').setAttribute("src", productImage); 

    // boucle qui répète autant de fois que la longueur de le nombre d'option de lentilles
    for (let i = 0; i < lensesNb; i++) {
        // remplir le menu déroulant des lentilles : crée des éléments Option au menu déroulant et les remplit avec value = i (index de lentille) et le contenu de l'array lenses
        let lenses = document.getElementById("lenses");
        let lensesOption = document.createElement("option");
        lensesOption.setAttribute("value", i);
        lensesOption.textContent = productLenses[i]; // rècupère le contenu de l'array lenses, d'abord index 0, puis 1...
        lenses.appendChild(lensesOption);
    }

};

// création d'une variable pour créer une url spécifique à ID
// récupère l'URL de la page
let URL = window.location;
console.log(URL);
// récupère le paramètre
let IDfull = window.location.search;
//enlève le point d'interrogation
let ID = IDfull.substring(1); // permet d'enlever le point d'interrogation
console.log("test récupération du paramètre de l'URL " + ID); 



// crée l'URL spécifique selon l'ID 
let apiURL = "http://localhost:3000/api/cameras/" + ID;


// fonction requête de l'API d'un ID spécifique
var secondApiRequest = new XMLHttpRequest();
secondApiRequest.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log("test requête seconde API ok");
        console.log(response);
        console.log(response.description); // test pour vérifier qu'on voit la description
        console.log(response.lenses.length);// affiche le nombre d'option de lentilles différentes
        productID = response._id;
        productName = response.name;
        productPrice = response.price;
        productDescription = response.description;
        productImage = response.imageUrl;
        lensesNb = response.lenses.length // récupère le nombre d'option de lentilles différentes
        productLenses = response.lenses; // récupère l'array contenant les différents lenses
        console.log(productLenses);

        // exécute la fonction cardFull
        cardFull();
        
    }

    else {
        console.log("problème serveur API");
        let productHide = document.getElementById("productdetail");
        productHide.classList.add("d-none");
    }

};


secondApiRequest.open("GET", apiURL);
secondApiRequest.send();
// fin fonction secondApiRequest


// à quoi ressemble l'URL d'une ID :  http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061



// fonction pour ajouter au localstorage
// pour l'instant ca fonctionne, mais cela rajoute une ligne au lieu d'incrémenter la quantité
let basket;

function addToLocalStorage() {
    if (localStorage.getItem("basket") === null) { // si la clé basket n'est pas créé // équivalent panier vide
        console.log("panier vide");
        basket = []; // crée un array vide
        basket.push({ // ajoute un objet
            id: productID,
            name: productName,
            price: productPrice,
            quantity: 1,
        });
        
    }
    else {
        console.log("panier rempli");
        basket = JSON.parse(localStorage.getItem("basket")); // récupère basket dans le localStorage et le transforme en JSON
        basket.push({  // rajoute un objet
            id: productID,
            name: productName,
            price: productPrice,
            quantity: 1,
        });
        
    }
    let basket_json = JSON.stringify(basket); // transforme en texte l'array basket
    localStorage.setItem("basket", basket_json); // le renvoie dans le localStorage
    console.log("test localstorage");
};
//fin de la fonction addToLocalStorage


// affichage de l'alerte "ajouter au panier" quand je clique sur "voir le panier" et fonction ajout au panier

let addToBasket = document.getElementById("addToBasketBtn");
let basketAlert = document.getElementById("basketalert");

addToBasket.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("test bouton panier")
    // enlève la class d-none (=display:none) au message d'alerte
    basketAlert.classList.remove("d-none");

    //lance la fonction addToLocalStorage
    addToLocalStorage();

});

//fin de la fonction click sur le bouton "ajouter au panier"

// fermer l'alerte quand on clique sur la petite croix 
let closeAlert = document.getElementById("closealert");

closeAlert.addEventListener('click', function () {
    console.log("test fermeture alerte");
    //ajoute la class d-none (=display:none) au message d'alerte
    basketAlert.classList.add("d-none");
});
// fin de la fonction pour fermer l'alerte "produit bien ajouté au panier"




