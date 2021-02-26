// JavaScript source code

// à voir ensuite pour les lentilles



// TEST pour aller chercher l'API spécifique d'un identifiant




// déclaration des variables utilisées dans la fonction cardFull puis dans secondApiRequest
let productName;
let productPrice;
let productDescription;
let productImage;
let lensesNb;
let productLenses;

// fonction pour remplir la card 
function cardFull() {

    console.log("test création fonction cardFull");

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
let ID = IDfull.substring(1);
console.log("test récupération du paramètre de l'URL " + ID); // voir comment enlever le point d'interrogation



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


// affichage de l'alerte "ajouter au panier" quand je clique sur "voir le panier"

let addToBasket = document.getElementById("addToBasketBtn");
let basketAlert = document.getElementById("basketalert");

addToBasket.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("test bouton panier")
    // enlève la class d-none (=display:none) au message d'alerte
    basketAlert.classList.remove("d-none");

    });

// fermer l'alerte quand on clique sur la petite croix 
let closeAlert = document.getElementById("closealert");

closeAlert.addEventListener('click', function () {
    console.log("test fermeture alerte");
    //ajoute la class d-none (=display:none) au message d'alerte
    basketAlert.classList.add("d-none");
});