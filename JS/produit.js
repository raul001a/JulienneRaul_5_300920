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

    console.log("test cr�ation fonction cardFull");

    // fait appara�tre la carte si l'API a mis du temps � r�pondre
    let productHide = document.getElementById("productdetail");
    productHide.classList.remove("d-none");

    // ajoute les diff�rents �l�ments de l'API dans les diff�rents �l�ments selon leur ID

    document.getElementById('productName').textContent = productName;
    document.getElementById('productDescription').textContent = productDescription;
    document.getElementById('productPrice').textContent = productPrice / 100 + " euros";
    document.getElementById('productImage').setAttribute("src", productImage); 

    // boucle qui r�p�te autant de fois que la longueur de le nombre d'option de lentilles
    for (let i = 0; i < lensesNb; i++) {
        // remplir le menu d�roulant des lentilles : cr�e des �l�ments Option au menu d�roulant et les remplit avec value = i (index de lentille) et le contenu de l'array lenses
        let lenses = document.getElementById("lenses");
        let lensesOption = document.createElement("option");
        lensesOption.setAttribute("value", i);
        lensesOption.textContent = productLenses[i]; // r�cup�re le contenu de l'array lenses, d'abord index 0, puis 1...
        lenses.appendChild(lensesOption);
    }

};

// cr�ation d'une variable pour cr�er une url sp�cifique � ID
// r�cup�re l'URL de la page
let URL = window.location;
console.log(URL);
// r�cup�re le param�tre
let IDfull = window.location.search;
//enl�ve le point d'interrogation
let ID = IDfull.substring(1); // permet d'enlever le point d'interrogation
console.log("test r�cup�ration du param�tre de l'URL " + ID); 



// cr�e l'URL sp�cifique selon l'ID 
let apiURL = "http://localhost:3000/api/cameras/" + ID;


// fonction requ�te de l'API d'un ID sp�cifique
var secondApiRequest = new XMLHttpRequest();
secondApiRequest.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log("test requ�te seconde API ok");
        console.log(response);
        console.log(response.description); // test pour v�rifier qu'on voit la description
        console.log(response.lenses.length);// affiche le nombre d'option de lentilles diff�rentes
        productID = response._id;
        productName = response.name;
        productPrice = response.price;
        productDescription = response.description;
        productImage = response.imageUrl;
        lensesNb = response.lenses.length // r�cup�re le nombre d'option de lentilles diff�rentes
        productLenses = response.lenses; // r�cup�re l'array contenant les diff�rents lenses
        console.log(productLenses);

        // ex�cute la fonction cardFull
        cardFull();
        
    }

    else {
        console.log("probl�me serveur API");
        let productHide = document.getElementById("productdetail");
        productHide.classList.add("d-none");
    }

};


secondApiRequest.open("GET", apiURL);
secondApiRequest.send();
// fin fonction secondApiRequest


// � quoi ressemble l'URL d'une ID :  http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061



// fonction pour ajouter au localstorage
// pour l'instant ca fonctionne, mais cela rajoute une ligne au lieu d'incr�menter la quantit�
let basket;

function addToLocalStorage() {
    if (localStorage.getItem("basket") === null) { // si la cl� basket n'est pas cr�� // �quivalent panier vide
        console.log("panier vide");
        basket = []; // cr�e un array vide
        basket.push({ // ajoute un objet
            id: productID,
            name: productName,
            price: productPrice,
            quantity: 1,
        });
        
    }
    else {
        console.log("panier rempli");
        basket = JSON.parse(localStorage.getItem("basket")); // r�cup�re basket dans le localStorage et le transforme en JSON
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
    // enl�ve la class d-none (=display:none) au message d'alerte
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
// fin de la fonction pour fermer l'alerte "produit bien ajout� au panier"




