// JavaScript source code

// � voir ensuite pour les lentilles



// TEST pour aller chercher l'API sp�cifique d'un identifiant

// cr�ation d'une variable pour cr�er une url sp�cifique � ID

let ID = "5be9c4c71c9d440000a730e9";
let URL = "http://localhost:3000/api/cameras/" + ID;


// d�claration des variables utilis�es dans la fonction cardFull puis dans secondApiRequest
let productName;
let productPrice;
let productDescription;
let productImage;
let lensesNb;
let productLenses;

// fonction pour remplir la card 
function cardFull() {

    console.log("test cr�ation fonction cardFull");

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




// fonction requ�te de l'API d'un ID sp�cifique
var secondApiRequest = new XMLHttpRequest();
secondApiRequest.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log("test requ�te seconde API ok");
        console.log(response);
        console.log(response.description); // test pour v�rifier qu'on voit la description
        console.log(response.lenses.length);// affiche le nombre d'option de lentilles diff�rentes
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
};

secondApiRequest.open("GET", URL);
secondApiRequest.send();
// fin fonction secondApiRequest


// � quoi ressemble l'URL d'une ID :  http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061

