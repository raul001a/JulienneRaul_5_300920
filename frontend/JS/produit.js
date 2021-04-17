// JavaScript source code


// d�claration des variables utilis�es dans la fonction cardFull puis dans secondApiRequest
let productID;
let productName;
let productPrice;
let productDescription;
let productImage;
let lensesNb;
let productLenses;


// fonction pour remplir la card 
function cardFull() {
    // fait appara�tre la carte si l'API a mis du temps � r�pondre
    let productHide = document.getElementById("productdetail");
    productHide.classList.remove("d-none");

    // ajoute les diff�rents �l�ments de l'API dans les diff�rents �l�ments selon leur ID
    document.getElementById('productName').textContent = productName;
    document.getElementById('productDescription').textContent = productDescription;
    document.getElementById('productPrice').textContent = productPrice / 100 + " euros";
    document.getElementById('productImage').setAttribute("src", productImage); 

    //ajoute le menu d�roulant des lentilles
    // boucle qui r�p�te autant de fois que la longueur du nombre d'option de lentilles
    productLenses.forEach(addLenses);    
};

function addLenses(lense, index) {
        // remplir le menu d�roulant des lentilles : cr�e des �l�ments Option au menu d�roulant et les remplit avec value = i (index de lentille) et le contenu de l'array lenses
        let lenses = document.getElementById("lenses");
        let lensesOption = document.createElement("option");
        lensesOption.setAttribute("value", index);
        lensesOption.textContent = lense; 
        lenses.appendChild(lensesOption);
    };

// cr�ation d'une variable pour cr�er une url sp�cifique � ID
// r�cup�re l'URL de la page
let URL = window.location;
//console.log(URL);
// r�cup�re le param�tre
let IDfull = window.location.search;
//enl�ve le point d'interrogation
let ID = IDfull.substring(1); // permet d'enlever le point d'interrogation
//console.log("test r�cup�ration du param�tre de l'URL " + ID); 

// cr�e l'URL sp�cifique selon l'ID 
let apiURL = "http://localhost:3000/api/cameras/" + ID;

fetch(apiURL)
    .then(function (reponse) {
        //console.log("test requ�te seconde API ok");
        return reponse.json();
    })

    .then(function (reponse) {
        let secondApiRequest = JSON.stringify(reponse); // transforme en texte 
        return JSON.parse(secondApiRequest); // transforme en array javascript

    })
    .then(function (secondApiReponse) {
        //console.log(secondApiReponse.lenses.length);// affiche le nombre d'option de lentilles diff�rentes
        productID = secondApiReponse._id;
        productName = secondApiReponse.name;
        productPrice = secondApiReponse.price;
        productDescription = secondApiReponse.description;
        productImage = secondApiReponse.imageUrl;
        lensesNb = secondApiReponse.lenses.length // r�cup�re le nombre d'option de lentilles diff�rentes
        productLenses = secondApiReponse.lenses; // r�cup�re l'array contenant les diff�rents lenses
        //console.log(productLenses);

        // ex�cute la fonction cardFull
        cardFull();
    })
    .catch(function (error) {
        console.log("erreur de chargement de l'API" + error);
    })



// fonction pour ajouter au localstorage

let basket;

function addToLocalStorage() {
    if (localStorage.getItem("basket") === null) { // si la cl� basket n'est pas cr�� // �quivalent panier vide
        //console.log("panier vide");
        basket = []; // cr�e un array vide
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
        basket = JSON.parse(localStorage.getItem("basket")); // r�cup�re basket dans le localStorage et le transforme en array javascript

        // recherche de l'ID dans l'array
        let result = basket.find(x => x.id === productID); // renvoie l'objet contenant l'ID cherch�    
            if (result === undefined) { // = on a pas trouv� l'ID dans le panier
                //console.log("identifiant pas trouv� dans le panier")
                basket.push({  // 
                    id: productID,
                    name: productName,
                    price: productPrice,
                    quantity: 1,    
                });
                console.log(basket.find(x => x.id === productID).name + " " + basket.find(x => x.id === productID).quantity );
            }

            else { // on a trouv� l'ID dans le localStorage
                //console.log("identifiant trouv� dans le panier, quantit� incr�ment�e")
                result.quantity++; // on rajoute une quantit�
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
    // enl�ve la class d-none (=display:none) au message d'alerte
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
// fin de la fonction pour fermer l'alerte "produit bien ajout� au panier"




