// JavaScript source code

// déclaration des variables utilisées dans la fonction cardCreate puis dans firstApiRequest
let name;
let price;
let description;
let image;



// fonction pour créer une Card 
function cardCreate() {

    console.log("test création fonction cardCreate"); 
    
    // ajoute la première div à "card group" 
    let printCard = document.getElementById('cardGroup');
    let firstDiv = document.createElement("div");
    firstDiv.setAttribute("class", "col-12 col-sm-6 col-lg-4");
    printCard.appendChild(firstDiv);

    // crée la second div et ses attributs
    let secondDiv = document.createElement("div");
    secondDiv.setAttribute("class", "card my-2 bg-beige shadow-lg");
    firstDiv.appendChild(secondDiv);

    // crée un élément img et ajoute attribut src / class / alt
    let img = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("class", "card-img");
    img.setAttribute("alt", "photo d'appareil photo")
    secondDiv.appendChild(img); // je crée à la deuxième div de cardGroup

    // création du card body // ajoute la classe card-body et l'ajoute à la deuxième div de cardgroup 
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    secondDiv.appendChild(cardBody);
    // crée la structure htlm de cardBody 
    cardBody.innerHTML = "<div><h2></h2><div><p></p></div></div> <p></p>";

    // ajoute class à la première div de card-body 
    document.querySelector(".card-body div").setAttribute("class", "card-title d-flex justify-content-between");

    // ajoute du contenu au H2 et à la div de card-title
    document.querySelector(".card-title h2").textContent = name;
    document.querySelector(".card-title div").setAttribute("class", "badge badge-success align-self-center");

    // ajout du prix dans le badge
    document.querySelector(".badge p").setAttribute("class", "h5 px-3");
    document.querySelector(".badge p").textContent = price / 100 + " euros";

    // ajout de la description dans le premier P de card-body // attention à mettre > pour sélection 1er enfant
    document.querySelector(".card-body > p").setAttribute("class", "card-text");
    document.querySelector(".card-body > p").textContent = description;

    // création du bouton "voir le détail"
    let btnDetail = document.createElement("div");
    btnDetail.setAttribute("class", "text-center");
    // l'ajouter à cardBody
    cardBody.appendChild(btnDetail);
    // créer le lien <a> du bouton 
    let a = document.createElement("a");
    // ajouter les différents attributs au a
    a.setAttribute("class", "btn btn-success stretched-link");
    a.setAttribute("role", "button");
    a.setAttribute("href", "produit.html"); //lien à modifier 
    a.textContent = "Voir le détail"; // regarder pourquoi accent fonctionne pas
    // ajoute le <a> au bouton
    btnDetail.appendChild(a);

    

};

// fin de la fonction cardCreate


// requête sur l'API principale 

    let firstApiRequest = new XMLHttpRequest();
    firstApiRequest.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let firstApiReponse = JSON.parse(this.responseText);
            console.log(firstApiReponse); // affiche la totalité de l'API
            console.log(firstApiReponse.length); // affiche la longueur de l'API
            console.log(firstApiReponse[0]); // affiche le détail du produit en index 0


            // boucle qui répète autant de fois que la longueur de l'API // la boucle est bien répétée 5 fois 
            for (let i = 0; i < firstApiReponse.length; i++) {
                console.log("test boucle");
                let productDetail = firstApiReponse[i]; // récupère le détail du produit en index i
                name = productDetail.name; // récupère le nom du produit en index i
                price = productDetail.price; // récupère le pric du produit en index i
                description = productDetail.description; // récupère la description du produit en index i
                image = productDetail.imageUrl; // récupère l'url du produit en index i

                console.log(name); // affiche le nom du produit en index i
                console.log(price); // affiche le prix du produit en index i
                console.log(description); // affiche la description du produit en index i
                console.log(image); // affiche l'url du produit en index i

                // lancer la fonction cardCreate
                cardCreate();
            }

            

        }
    };

    firstApiRequest.open("GET", "http://localhost:3000/api/cameras");
    firstApiRequest.send();











