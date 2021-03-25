// JavaScript source code

// déclaration des variables utilisées dans la fonction cardCreate puis dans firstApiRequest
let name;
let price;
let description;
let image;
let ID;



// fonction pour créer une Card 
function cardCreate() {

    console.log("test création fonction cardCreate"); 
    
    // ajoute la première div à "card group" 
    let printCard = document.getElementById('cardGroup');
    let firstDiv = document.createElement("div");
    firstDiv.setAttribute("class", "col-12 col-sm-6 col-lg-4 d-flex ");
    printCard.appendChild(firstDiv);

    // crée la second div et ses attributs
    let secondDiv = document.createElement("div");
    secondDiv.setAttribute("class", "card my-2 bg-beige shadow-lg");
    firstDiv.appendChild(secondDiv);

    // crée un élément img et ajoute attribut src / class / alt
    let img = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("class", "card-img ");
    img.setAttribute("alt", "photo d'appareil photo")
    secondDiv.appendChild(img); // je crée à la deuxième div de cardGroup

    // création du card body // ajoute la classe card-body et l'ajoute à la deuxième div de cardgroup 
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    secondDiv.appendChild(cardBody);

    // création de cardTitle, enfant de cardBody
    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "card-title d-flex justify-content-between");
    cardBody.appendChild(cardTitle);

    // création de h2 enfant de cardTitle
    let h2 = document.createElement("h2");
    h2.textContent = name;
    cardTitle.appendChild(h2);

    // création du badge, enfant de cardTitle
    let badge = document.createElement("div");
    badge.setAttribute("class", "badge badge-success align-self-center");
    cardTitle.appendChild(badge);

    // remplissage du badge avec un p et le prix
    let badgeInside = document.createElement("div");
    badgeInside.setAttribute("class", "h5 px-3");
    badgeInside.textContent = price / 100 + " euros";
    badge.appendChild(badgeInside);

    // création de p, enfant de cardbody, rempli avec la description
    let descriptionCard = document.createElement("p");
    descriptionCard.setAttribute("class", "card-text");
    descriptionCard.textContent = description;
    cardBody.appendChild(descriptionCard);

    

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
    a.setAttribute("href", "produit.html?"+ ID); //lien vers page produit en ajoutant l'ID comme paramètre
    a.textContent = "Voir plus"; // 
    // ajoute le <a> au bouton
    btnDetail.appendChild(a);

    

};

// fin de la fonction cardCreate

// requête de l'API avec fetch 

fetch("http://localhost:3000/api/cameras")
    .then(function (reponse) {
        console.log(reponse);
        return reponse.json();
    })

    .then(function (reponse) {      
        let firstApiRequest = JSON.stringify(reponse); // transforme en texte 
        return  JSON.parse(firstApiRequest); // transforme en array javascript
        
    }) 
    .then(function (firstApiReponse) {
        console.log(firstApiReponse);
        console.log(firstApiReponse.length);
        // boucle qui répète autant de fois que la longueur de l'API // la boucle est bien répétée 5 fois 
        for (let i = 0; i < firstApiReponse.length; i++) {
            console.log("test boucle");
            let productDetail = firstApiReponse[i]; // récupère le détail du produit en index i
            name = productDetail.name; // récupère le nom du produit en index i
            price = productDetail.price; // récupère le pric du produit en index i
            description = productDetail.description; // récupère la description du produit en index i
            image = productDetail.imageUrl; // récupère l'url du produit en index i
            ID = productDetail._id; // récupère l'ID du produit en index i

            console.log(name); // affiche le nom du produit en index i
            console.log(price); // affiche le prix du produit en index i
            console.log(description); // affiche la description du produit en index i
            console.log(image); // affiche l'url du produit en index i
            console.log(ID);

            // lancer la fonction cardCreate
            cardCreate();
        }
    })
    .catch(function (error) {
        console.log("erreur de chargement de l'API" + error);
    })


/* première requête d'abod ecrit avec XMlHttRequest
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
                ID = productDetail._id; // récupère l'ID du produit en index i

                console.log(name); // affiche le nom du produit en index i
                console.log(price); // affiche le prix du produit en index i
                console.log(description); // affiche la description du produit en index i
                console.log(image); // affiche l'url du produit en index i
                console.log(ID);

                // lancer la fonction cardCreate
                cardCreate();
            }

        }

        else {
            console.log("problème serveur API");
            
        }
    };

    firstApiRequest.open("GET", "http://localhost:3000/api/cameras");
    firstApiRequest.send();
*/










