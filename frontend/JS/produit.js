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
    // fait apparaître la carte si l'API a mis du temps à répondre
    let productHide = document.getElementById("productdetail");
    productHide.classList.remove("d-none");

    // ajoute les différents éléments de l'API dans les différents éléments selon leur ID
    document.getElementById('productName').textContent = productName;
    document.getElementById('productDescription').textContent = productDescription;
    document.getElementById('productPrice').textContent = productPrice / 100 + " euros";
    document.getElementById('productImage').setAttribute("src", productImage); 

    //ajoute le menu déroulant des lentilles
    // boucle qui répète autant de fois que la longueur du nombre d'option de lentilles
    productLenses.forEach(addLenses);    
};

function addLenses(lense, index) {
        // remplir le menu déroulant des lentilles : crée des éléments Option au menu déroulant et les remplit avec value = i (index de lentille) et le contenu de l'array lenses
        let lenses = document.getElementById("lenses");
        let lensesOption = document.createElement("option");
        lensesOption.setAttribute("value", index);
        lensesOption.textContent = lense; 
        lenses.appendChild(lensesOption);
    };

// création d'une variable pour créer une url spécifique à ID
// récupère l'URL de la page
let URL = window.location;
//console.log(URL);
// récupère le paramètre
let IDfull = window.location.search;
//enlève le point d'interrogation
let ID = IDfull.substring(1); // permet d'enlever le point d'interrogation
//console.log("test récupération du paramètre de l'URL " + ID); 

// crée l'URL spécifique selon l'ID 
let apiURL = "http://localhost:3000/api/cameras/" + ID;

fetch(apiURL)
    .then(function (reponse) {
        //console.log("test requête seconde API ok");
        return reponse.json();
    })

    .then(function (reponse) {
        let secondApiRequest = JSON.stringify(reponse); // transforme en texte 
        return JSON.parse(secondApiRequest); // transforme en array javascript

    })
    .then(function (secondApiReponse) {
        //console.log(secondApiReponse.lenses.length);// affiche le nombre d'option de lentilles différentes
        productID = secondApiReponse._id;
        productName = secondApiReponse.name;
        productPrice = secondApiReponse.price;
        productDescription = secondApiReponse.description;
        productImage = secondApiReponse.imageUrl;
        lensesNb = secondApiReponse.lenses.length // récupère le nombre d'option de lentilles différentes
        productLenses = secondApiReponse.lenses; // récupère l'array contenant les différents lenses
        //console.log(productLenses);

        // exécute la fonction cardFull
        cardFull();
    })
    .catch(function (error) {
        console.log("erreur de chargement de l'API" + error);
    })



// fonction pour ajouter au localstorage

let basket;

function addToLocalStorage() {
    if (localStorage.getItem("basket") === null) { // si la clé basket n'est pas créé // équivalent panier vide
        //console.log("panier vide");
        basket = []; // crée un array vide
        basket.push({ // ajoute un objet
            id: productID,
            name: productName,
            price: productPrice,
            quantity: 1,            
        });
        //console.log(basket);
    }
    else {
        //console.log("panier existant");
        basket = JSON.parse(localStorage.getItem("basket")); // récupère basket dans le localStorage et le transforme en array javascript

        // recherche de l'ID dans l'array
        let result = basket.find(x => x.id === productID); // renvoie l'objet contenant l'ID cherché    
            if (result === undefined) { // = on a pas trouvé l'ID dans le panier
                //console.log("identifiant pas trouvé dans le panier")
                basket.push({  // 
                    id: productID,
                    name: productName,
                    price: productPrice,
                    quantity: 1,    
                });
                console.log(basket.find(x => x.id === productID).name + " " + basket.find(x => x.id === productID).quantity );
            }

            else { // on a trouvé l'ID dans le localStorage
                //console.log("identifiant trouvé dans le panier, quantité incrémentée")
                result.quantity++; // on rajoute une quantité
                //console.log(result.name +" " + result.quantity);
            };
        
    }
    let basket_json = JSON.stringify(basket); // transforme en texte l'array basket
    localStorage.setItem("basket", basket_json); // le renvoie dans le localStorage
};
//fin de la fonction addToLocalStorage


// affichage de l'alerte "ajouter au panier" quand je clique sur "voir le panier" et fonction ajout au panier

let addToBasket = document.getElementById("addToBasketBtn");
let basketAlert = document.getElementById("basketalert");

addToBasket.addEventListener('click', function (event) {
    event.preventDefault();
    // enlève la class d-none (=display:none) au message d'alerte
    basketAlert.classList.remove("d-none");
    //lance la fonction addToLocalStorage
    addToLocalStorage();
});

//fin de la fonction click sur le bouton "ajouter au panier"

// fermer l'alerte quand on clique sur la petite croix 
let closeAlert = document.getElementById("closealert");

closeAlert.addEventListener('click', function () {
    //ajoute la class d-none (=display:none) au message d'alerte
    basketAlert.classList.add("d-none");
});
// fin de la fonction pour fermer l'alerte "produit bien ajouté au panier"




